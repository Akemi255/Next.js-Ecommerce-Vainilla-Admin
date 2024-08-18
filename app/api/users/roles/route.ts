import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userId, newRole, email } = body;

    // Validaciones
    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    if (!newRole) {
      return new NextResponse("New role is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Verificar si el usuario que solicita la actualización es un administrador
    const adminUser = await prismadb.user.findUnique({
      where: { email: email },
    });

    if (!adminUser || adminUser.role !== "admin") {
      return new NextResponse("You do not have permission to change roles", {
        status: 403,
      });
    }

    // Verificar si el usuario a actualizar existe
    const user = await prismadb.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Actualizar el rol del usuario
    const updatedUser = await prismadb.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USER_ROLE_CHANGE_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
