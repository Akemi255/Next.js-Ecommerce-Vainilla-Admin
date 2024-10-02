import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    let about = await prismadb.policies.findFirst();

    if (!about) {
      about = await prismadb.policies.create({
        data: {
          text,
        },
      });
    } else {
      about = await prismadb.policies.update({
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
