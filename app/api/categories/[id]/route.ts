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

    const categorie = await prismadb.category.delete({
      where: {
        id: params.id,
      },
    });
    revalidatePath("/categories");
    return NextResponse.json(categorie);
  } catch (error) {
    console.log("[CATEGORIE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const { name, imageUrl } = body;

    if (!params.id) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // Validations
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
    }

    await prismadb.category.update({
      where: {
        id: params.id,
      },
      data: {
        name: name,
        image: imageUrl,
      },
    });

    revalidatePath("/categories");
    return NextResponse.json("Category updated successfully");
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
