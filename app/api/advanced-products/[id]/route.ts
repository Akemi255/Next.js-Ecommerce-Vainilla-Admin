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

    // Eliminar los OrderItems relacionados antes de eliminar el producto
    await prismadb.orderItem.deleteMany({
      where: {
        productId: params.id,
      },
    });

    const product = await prismadb.advancedProduct.delete({
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

    const { name, description, categoryId, isFeature } = body;

    if (!params.id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    await prismadb.advancedProduct.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        category: {
          connect: {
            id: categoryId,
          },
        },
        isFeature,
      },
    });

    revalidatePath("/products");
    return NextResponse.json("Product updated successfully");
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
