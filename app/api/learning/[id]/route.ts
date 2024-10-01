import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const { text } = body;

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    if (!params.id) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    const learning = await prismadb.learningCategory.update({
      where: { id: params.id },
      data: {
        text: text,
      },
    });

    return NextResponse.json(learning);
  } catch (error) {
    console.error("[LEARNING_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { categoryName } = body;

    if (!params.id) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!categoryName) {
      return new NextResponse("Category Name is required", { status: 400 });
    }

    const learning = await prismadb.learningCategory.update({
      where: { id: params.id },
      data: {
        name: categoryName,
      },
    });

    if (!learning) {
      return new NextResponse("Learning Category not Found", { status: 404 });
    }

    return NextResponse.json(learning);
  } catch (error) {
    console.error("[LEARNING_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { imageUrls } = body;

    if (!params.id) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!imageUrls) {
      return new NextResponse("imageUrls Name is required", { status: 400 });
    }

    const learning = await prismadb.learningCategory.update({
      where: { id: params.id },
      data: {
        images: {
          deleteMany: {},
          create: imageUrls.map((url: string) => ({
            url,
          })),
        },
      },
      include: { images: true },
    });

    if (!learning) {
      return new NextResponse("Learning Category not Found", { status: 404 });
    }

    return NextResponse.json(learning);
  } catch (error) {
    console.error("[LEARNING_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    const learning = await prismadb.learningCategory.delete({
      where: { id: params.id },
    });

    if (!learning) {
      return new NextResponse("Learning Category not Found", { status: 404 });
    }

    return NextResponse.json(learning);
  } catch (error) {
    console.error("[LEARNING_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
