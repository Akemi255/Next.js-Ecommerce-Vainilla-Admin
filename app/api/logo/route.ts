import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrls } = body;

    if (!imageUrls || typeof imageUrls !== "string" || imageUrls.length === 0) {
      return new NextResponse("ImageUrl is required and must be a string", {
        status: 400,
      });
    }

    let logo = await prismadb.logo.findFirst({});

    if (!logo) {
      logo = await prismadb.logo.create({
        data: {
          imageUrl: imageUrls,
        },
      });
    } else {
      logo = await prismadb.logo.update({
        where: { id: logo.id },
        data: {
          imageUrl: imageUrls,
        },
      });
    }

    return NextResponse.json(logo);
  } catch (error) {
    console.error("[LOGO_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
