import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const categorie = await prismadb.category.create({
      data: {
        name: name,
      },
    });

    revalidatePath("/categories");
    return NextResponse.json(categorie);
  } catch (error) {
    console.error("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}