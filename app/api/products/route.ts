import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, description, price, stock, imageUrl } = body;

    // Validaciones
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const image = imageUrl;

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!stock) {
      return new NextResponse("Stock is required", { status: 400 });
    }

    // Creación del producto en la base de datos
    const product = await prismadb.product.create({
      data: {
        name,
        description,
        image,
        price,
        stock,
      },
    });

    revalidatePath("/products");
    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
