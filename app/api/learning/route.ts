import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { categoryName } = body;

    if (!categoryName) {
      return new NextResponse("Category is required", { status: 400 });
    }

    const learningCategory = await prismadb.learningCategory.create({
      data: {
        name: categoryName,
      },
    });

    return NextResponse.json(learningCategory);
  } catch (error) {
    console.error("[LEARNING_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
