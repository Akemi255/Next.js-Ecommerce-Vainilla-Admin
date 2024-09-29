import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    let about = await prismadb.ourHistory.findFirst();

    if (!about) {
      about = await prismadb.ourHistory.create({
        data: {
          text,
        },
      });
    } else {
      about = await prismadb.ourHistory.update({
        where: { id: about.id },
        data: { text },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("[TEXT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { imageUrls } = body;

    if (!imageUrls || imageUrls.length === 0) {
      return new NextResponse("ImageUrls is required", { status: 400 });
    }

    let about = await prismadb.ourHistory.findFirst({
      include: { images: true },
    });

    if (!about) {
      about = await prismadb.ourHistory.create({
        data: {
          images: {
            create: imageUrls.map((url: string) => ({
              url,
            })),
          },
        },
        include: { images: true },
      });
    } else {
      about = await prismadb.ourHistory.update({
        where: { id: about.id },
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
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("[IMAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
