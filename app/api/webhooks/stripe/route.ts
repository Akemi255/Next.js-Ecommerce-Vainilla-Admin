import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
        email: session?.customer_details?.email || "",
      },
      include: {
        orderItems: true,
      },
    });

    // Update stock based on the quantity purchased
    const updateStockPromises = order.orderItems.map((orderItem) => {
      if (orderItem.productId) {
        // Update stock for Product
        return prismadb.product.update({
          where: {
            id: orderItem.productId,
          },
          data: {
            stock: {
              decrement: orderItem.quantity,
            },
          },
        });
      } else if (orderItem.productVariantId) {
        // Update stock for ProductVariant
        return prismadb.productVariant.update({
          where: {
            id: orderItem.productVariantId,
          },
          data: {
            stock: {
              decrement: orderItem.quantity,
            },
          },
        });
      }
      return null;
    });

    await Promise.all(
      updateStockPromises.filter((promise) => promise !== null)
    );
  }

  return new NextResponse(null, { status: 200 });
}
