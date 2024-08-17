"use server";
import { signIn } from "@/auth";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";

import { signInSchema, signUpSchema } from "@/lib/zod";
import { unknown, z } from "zod";
import { isBefore } from "date-fns";
import { deleteVerificationToken } from "@/utils/password";

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(4, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginAction = async (values: z.infer<typeof signInSchema>) => {
  try {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      redirectTo: "/",
    });

    if (result?.error) {
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred." };
  }
};

export const registerAction = async (values: z.infer<typeof signUpSchema>) => {
  try {
    const { data, success } = signUpSchema.safeParse(values);

    if (!success) {
      return { error: "Invalid data" };
    }

    //verificar si el usuario ya existe
    const user = await prismadb.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return { error: "User already exist" };
    } else {
      const hashpassword = await bcrypt.hash(data.password, 10);

      //crear usuario
      await prismadb.user.create({
        data: {
          email: data.email,
          password: hashpassword,
        },
      });

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        redirectTo: "/",
      });

      if (result?.error) {
        return { error: result.error };
      }

      return { success: true };
    }
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred." };
  }
};

export const verificateAccount = async (token: string, email: string) => {
  try {
    // Buscar el token en la base de datos
    const verificationToken = await prismadb.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    if (!verificationToken) {
      throw new Error("Token de verificación no encontrado.");
    }

    if (isBefore(new Date(), verificationToken.expires)) {
      // Token es válido y no ha expirado
      // Actualizar el usuario para marcar el correo como verificado
      await prismadb.user.update({
        where: { email },
        data: { emailVerified: new Date() },
      });

      // Eliminar el token de verificación después de usarlo
      await prismadb.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token,
          },
        },
      });

      return { success: true };
    } else {
      throw new Error("Token de verificación expirado.");
    }
  } catch (error) {
    console.error("Error al verificar la cuenta:", error);
    return { success: false };
  }
};

export const VerificateUpdate = async (token: string, email: string) => {
  try {
    // Buscar el token en la base de datos con el email y token proporcionados
    const tokenRecord = await prismadb.verificationPasswordToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    if (tokenRecord && tokenRecord.expires > new Date()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return false;
  }
};

export const updatePassword = async (
  email: string,
  searchParamsToken: string,
  passwordData: { newPassword: string; confirmPassword: string }
) => {
  // Validar los datos usando el esquema de Zod
  const validation = passwordSchema.safeParse(passwordData);

  if (!validation.success) {
    // Si la validación falla, devolver los errores
    return { success: false, message: validation.error.errors[0].message };
  }

  try {
    // Cifrar la nueva contraseña
    const hashedPassword = await bcrypt.hash(passwordData.newPassword, 10);

    // Actualizar la contraseña en la base de datos
    const updatedUser = await prismadb.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    if (updatedUser) {
      return { success: true };
    } else {
      return { success: false, message: "No se encontró el usuario." };
    }
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    return { success: false, message: "Error al actualizar la contraseña." };
  }
};
