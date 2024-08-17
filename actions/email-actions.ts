"use server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { addHours } from "date-fns";

import prismadb from "@/lib/prismadb";

export const sendVerificationEmail = async (email: string) => {
  // Generar un token aleatorio de verificación
  const token = crypto.randomBytes(32).toString("hex");

  // Fecha de expiración (24 horas)
  const expires = addHours(new Date(), 24);

  try {
    // Guardar el token en la base de datos
    await prismadb.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // URL para verificar el correo
    const verificationLink = `http://localhost:3000/verify-email?token=${token}&email=${email}`;

    // Crear el transportador de Nodemailer usando Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Enviar el correo electrónico de verificación
    const mailOptions = {
      from: "gusvet1465@gmail.com",
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Haz clic en el siguiente enlace para verificar tu correo electrónico: ${verificationLink}`,
      html: `<p>Haz clic en el siguiente enlace para verificar tu correo electrónico:</p><a href="${verificationLink}">${verificationLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error al enviar el correo de verificación:", error);
    return { error: "Error al enviar el correo de verificación" };
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  // Generar un token aleatorio de restablecimiento
  const token = crypto.randomBytes(32).toString("hex");

  // Establecer la fecha de expiración (por ejemplo, 1 hora)
  const expires = addHours(new Date(), 1);

  try {
    // Guardar el token en la base de datos
    await prismadb.verificationPasswordToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // URL para restablecer la contraseña
    const resetLink = `http://localhost:3000/reset-password/verify-password?token=${token}&email=${email}`;

    // Configurar Nodemailer para enviar el correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Opciones de correo electrónico
    const mailOptions = {
      from: "gusvet1465@gmail.com",
      to: email,
      subject: "Restablecer contraseña",
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error(
      "Error al enviar el correo de restablecimiento de contraseña:",
      error
    );
    return {
      error: "Error al enviar el correo de restablecimiento de contraseña",
    };
  }
};
