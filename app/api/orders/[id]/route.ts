import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    await prismadb.orderItem.deleteMany({
      where: {
        orderId: params.id,
      },
    });

    const order = await prismadb.order.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
