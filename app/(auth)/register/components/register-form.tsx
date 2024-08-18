"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import Image from "next/image";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { registerAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { sendVerificationEmail } from "@/actions/email-actions";

type SignUpValues = z.infer<typeof signUpSchema>;

export default function RegisterForm() {
    const [message, setMessage] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (values: SignUpValues) => {

        startTransition(async () => {
            try {
                const result = await registerAction(values);
                if (result?.error) {
                    console.log(result.error);
                    toast.error("Ups... ha ocurrido un error");
                } else if (result && values.email) {
                    toast.success("Usuario creado con éxito!");
                    setMessage(true);
                }
            } catch (error) {
                console.error("Error fetching:", error);
                toast.error("Error de conexión. Por favor, intenta de nuevo.");
            }
        });
    };

    return (
        <div className="w-full min-h-screen lg:flex lg:items-stretch lg:justify-between">
            <div className="flex flex-col justify-center py-12 lg:w-1/2 lg:min-h-screen lg:py-24 lg:pr-8">
                <div className="mx-auto grid w-full max-w-md gap-6 lg:gap-8">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Register</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your details below to create a new account
                        </p>
                    </div>

                    {message && (
                        <div className="bg-green-500 text-white p-4 rounded-lg; mb-4">
                            Hemos enviado un correo de verificación a su dirección de email, si no lo encuentra revise su bandeja de spam.
                            Por favor, verifíquelo para continuar.
                        </div>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                {...field}
                                                disabled={form.formState.isSubmitting}
                                            />
                                        </FormControl>
                                        <FormDescription>Email address</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                type="password"
                                                {...field}
                                                disabled={form.formState.isSubmitting}
                                            />
                                        </FormControl>
                                        <FormDescription>Password</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                {...field}
                                                disabled={form.formState.isSubmitting}
                                            />
                                        </FormControl>
                                        <FormDescription>Confirm your password</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isPending}>
                                Sign up
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Ya tienes una cuenta?{" "}
                        <Link href="/login" className="underline">
                            Inicia sesión
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 lg:min-h-screen">
                <Image
                    src="https://www.slofoodgroup.com/cdn/shop/articles/how-to-tell-the-difference-between-the-various-types-of-vanilla-beans-637368_640x.jpeg?v=1631040610"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
