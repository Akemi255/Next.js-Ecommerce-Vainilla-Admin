import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { youtubeUrl } = body;

    let about = await prismadb.about.findFirst();

    if (!about) {
      about = await prismadb.about.create({
        data: {
          youtubeUrl: youtubeUrl,
        },
      });
    } else {
      about = await prismadb.about.update({
        where: { id: about.id },
        data: { youtubeUrl: youtubeUrl },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("[YT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
