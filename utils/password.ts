import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";

// Función para generar el hash de la contraseña
export const saltAndHashPassword = (password: any) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

// Función para obtener el usuario desde la base de datos
export const getUserFromDb = async (email: any, password: any) => {
  try {
    // Buscar usuario por email
    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    // Si no se encuentra el usuario
    if (!user) {
      return null;
    }

    // Verificar la contraseña (compara la contraseña en texto plano con la almacenada hasheada)
    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error al obtener el usuario de la base de datos:", error);
    return null;
  }
};

export const deleteVerificationToken = async (token: string) => {
  try {
    const deletionResult = await prismadb.verificationPasswordToken.deleteMany({
      where: { token },
    });

    // Verifica si se eliminaron registros
    if (deletionResult.count > 0) {
      return { success: true };
    } else {
      return {
        success: false,
        message: "No se encontró el token de verificación.",
      };
    }
  } catch (error) {
    console.error("Error al eliminar el token de verificación:", error);
    return {
      success: false,
      message: "Error al eliminar el token de verificación.",
    };
  }
};
