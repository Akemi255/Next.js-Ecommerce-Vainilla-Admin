import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, description, price, stock, images, Category } = body;

    // Validaciones
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
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

    if (!stock) {
      return new NextResponse("Stock is required", { status: 400 });
    }

    if (!Category) {
      return new NextResponse("Category is required", { status: 400 });
    }

    // Creación del producto en la base de datos
    const product = await prismadb.product.create({
      data: {
        name,
        description,
        price,
        stock,
        Category,
        images: {
          create: images.map((url: string) => ({
            url,
          })),
        },
      },
    });

    revalidatePath("/products");
    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
