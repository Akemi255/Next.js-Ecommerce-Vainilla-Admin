import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, price, stock, images } = body;

    const id = params.id;

    if (!id) {
      return new NextResponse("ProductVariant ID is required", { status: 400 });
    }

    const existingVariant = await prismadb.productVariant.findUnique({
      where: { id },
    });

    if (!existingVariant) {
      return new NextResponse("Product variant not found", { status: 404 });
    }

    if (price !== undefined && price <= 0) {
      return new NextResponse("Price must be greater than 0", { status: 400 });
    }

    if (stock !== undefined && stock < 0) {
      return new NextResponse("Stock must be 0 or greater", { status: 400 });
    }

    const updatedVariant = await prismadb.productVariant.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(price !== undefined && { price }),
        ...(stock !== undefined && { stock }),
        images: {
          deleteMany: {},
          create: images.map((url: string) => ({ url })),
        },
      },
    });

    revalidatePath("/products");
    return NextResponse.json(updatedVariant);
  } catch (error) {
    console.error("[PRODUCT_VARIANTS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Product Variant id is required", {
        status: 400,
      });
    }

    const id = params.id;

    const existingVariant = await prismadb.productVariant.findUnique({
      where: { id },
    });

    if (!existingVariant) {
      return new NextResponse("Product variant not found", { status: 404 });
    }

    await prismadb.orderItem.deleteMany({
      where: {
        productId: params.id,
      },
    });

    await prismadb.productVariant.delete({
      where: { id },
    });

    revalidatePath("/products");

    return new NextResponse("Product variant deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("[PRODUCT_VARIANTS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
