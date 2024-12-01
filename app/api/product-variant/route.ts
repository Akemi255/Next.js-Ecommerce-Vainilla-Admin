import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, price, stock, advancedProductId, images } = body;

    // Validaciones
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (price === undefined || price <= 0) {
      return new NextResponse("Price must be greater than 0", { status: 400 });
    }

    if (stock === undefined || stock < 0) {
      return new NextResponse("Stock must be 0 or greater", { status: 400 });
    }

    if (!advancedProductId) {
      return new NextResponse("AdvancedProductId is required", { status: 400 });
    }

    // Verificar si el producto avanzado existe
    const advancedProduct = await prismadb.advancedProduct.findUnique({
      where: { id: advancedProductId },
    });

    if (!advancedProduct) {
      return new NextResponse("Advanced product not found", { status: 404 });
    }

    const variant = await prismadb.productVariant.create({
      data: {
        name,
        price,
        stock,
        advancedProductId,
        images: {
          create: images.map((url: string) => ({
            url,
          })),
        },
      },
    });

    revalidatePath("/products");
    return NextResponse.json(variant);
  } catch (error) {
    console.error("[PRODUCT_VARIANTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
