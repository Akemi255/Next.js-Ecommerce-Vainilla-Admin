import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return new NextResponse("Text is required", { status: 400 });
    }

    const formattedText = text
      .replace(/(<br \/>)(?=\s*<br \/>)/g, "<br />")
      .replace(/<br \/>/g, "<br /> ")
      .replace(/\s*<br \/>/g, "<br /> ");

    let about = await prismadb.policies.findFirst();

    if (!about) {
      about = await prismadb.policies.create({
        data: {
          text: formattedText,
        },
      });
    } else {
      about = await prismadb.policies.update({
        where: { id: about.id },
        data: { text: formattedText },
      });
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error("[TEXT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
