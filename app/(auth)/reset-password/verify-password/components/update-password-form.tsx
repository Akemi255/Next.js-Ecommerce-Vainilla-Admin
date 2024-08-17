"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { verificateAccount } from "@/actions/auth-actions";
import { updatePassword } from "@/actions/auth-actions"; // Function to handle password update
import toast from "react-hot-toast";

// Schema for password validation using Zod
const passwordSchema = z
    .object({
        password: z.string().min(4, "La contraseña debe tener al menos 8 caracteres"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

type PasswordValues = z.infer<typeof passwordSchema>;

interface UpdatePasswordFormProps {
    email: string
    searchParamsToken: string
}

export default function UpdatePasswordForm({ email, searchParamsToken }: UpdatePasswordFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const form = useForm<PasswordValues>({
        resolver: zodResolver(passwordSchema),
    });


    const handlePasswordSubmit = async (values: PasswordValues) => {
        setLoading(true)
        try {
            const result = await updatePassword(email, searchParamsToken, {
                newPassword: values.password,
                confirmPassword: values.confirmPassword,
            });

            if (result.success) {
                toast.success("Contraseña actualizada correctamente")
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setMessage("Error al actualizar la contraseña.");
            }
        } catch (error) {
            setMessage("Error inesperado.");
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                <h1 className="text-2xl font-semibold mb-4">Actualizar Contraseña</h1>
                <>
                    <p className={`mb-6 ${message?.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nueva Contraseña</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Nueva contraseña"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Contraseña</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirma tu nueva contraseña"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loading || form.formState.isSubmitting}>
                                Actualizar Contraseña
                            </Button>
                        </form>
                    </Form>
                </>


                <Button
                    onClick={() => router.push("/login")}
                    className="w-full py-2 px-4 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 mt-4"
                >
                    Volver al inicio
                </Button>
            </div>
        </div>
    );
}
