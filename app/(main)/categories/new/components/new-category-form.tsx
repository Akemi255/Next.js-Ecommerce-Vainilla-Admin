"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const categorySchema = z.object({
    name: z.string().min(1, { message: 'El nombre es obligatorio.' }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function NewCategoryForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            setLoading(true);
            await axios.post(`/api/categories`, values);
            router.push(`/categories`);
            router.refresh();
            toast.success("Categoría creada correctamente");
        } catch (error: any) {
            toast.error("Algo salió mal.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Crear Nueva Categoría</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de la Categoría</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ejemplo: Vainilla" {...field} disabled={loading} />
                                </FormControl>
                                <FormDescription>Nombre único para la categoría.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Cargando..." : "Guardar Categoría"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
