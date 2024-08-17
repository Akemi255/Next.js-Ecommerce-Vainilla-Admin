"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { sendPasswordResetEmail } from "@/actions/email-actions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const resetPasswordSchema = z.object({
    email: z.string().email("El correo electrónico no es válido"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
    const [message, setMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = async (values: ResetPasswordValues) => {
        startTransition(async () => {
            const result = await sendPasswordResetEmail(values.email);
            if (result?.success) {
                setMessage("Correo de restablecimiento de contraseña enviado. Revisa tu bandeja de entrada o en caso de no encontrarlo, la de spam.");
            } else {
                setMessage("Error al enviar el correo. Inténtalo de nuevo.");
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h1 className="text-2xl font-semibold mb-4">Restablecer Contraseña</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="m@example.com"
                                            type="email"
                                            {...field}
                                            disabled={form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            Enviar correo de restablecimiento
                        </Button>
                    </form>
                </Form>
                {message && (
                    <p className={`mt-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
