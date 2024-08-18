import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.delete({
      where: {
        id: params.id,
      },
    });
    revalidatePath("/products");
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Extracting the array of image URLs instead of a single image
    const { name, description, price, stock, images } = body;

    if (!params.id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    // Validations
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || images.length === 0) {
      return new NextResponse("At least one image is required", {
        status: 400,
      });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (stock === undefined) {
      return new NextResponse("Stock is required", { status: 400 });
    }

    // Update the product with the array of images
    await prismadb.product.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        images: {
          deleteMany: {},
          create: images.map((url: string) => ({ url })),
        },
        price,
        stock,
      },
    });

    revalidatePath("/products");
    return NextResponse.json("Product updated successfully");
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
