"use server";

import prismadb from "@/lib/prismadb";

export const createLogo = async () => {
  try {
    const logo = await prismadb.logo.create({
      data: {
        imageUrl: "https://i.postimg.cc/9FrGyDcD/logo.png",
      },
    });
    return logo;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el logo");
  }
};
