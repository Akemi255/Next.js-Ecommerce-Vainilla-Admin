"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";

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

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/auth-actions";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type SignUpValues = z.infer<typeof signInSchema>;

export default function LoginForm() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm<SignUpValues>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        startTransition(async () => {
            const result = await loginAction(values);
            if (result?.error) {
                toast.error("Email o contraseña incorrectos.");
            } else {
                toast.success("Login successful!");
                router.push("/")
            }
        });
    };

    return (
        <div className="w-full min-h-screen lg:flex lg:items-stretch lg:justify-between">
            <div className="flex flex-col justify-center py-12 lg:w-1/2 lg:min-h-screen lg:py-24 lg:pr-8">
                <div className="mx-auto grid w-full max-w-md gap-6 lg:gap-8">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your details below to log in
                        </p>
                    </div>

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
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {form.formState.isSubmitting ? "Logging in..." : "Log in"}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        No tienes una cuenta? {" "}
                        <Link href="/register" className="underline">
                            Regístrese
                        </Link>
                        <div className="mt-4 text-center text-sm underline cursor-pointer" onClick={() => router.push("/reset-password")}>
                            Olvidó su contraseña?
                        </div>
                    </div>

                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 lg:min-h-screen">
                <Image
                    src="https://turndough.com/wp-content/uploads/2024/04/Vanilla-Beans-Ice-Cream-1.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
