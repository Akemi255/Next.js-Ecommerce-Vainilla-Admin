"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import OneImageUpload from "@/components/one-image-upload";
import { Category } from "@prisma/client";

const categorySchema = z.object({
    name: z.string()
        .min(1, { message: 'El nombre es obligatorio.' })
        .trim()
        .regex(/^[a-zA-ZÀ-ÿ0-9\s]+$/, { message: 'El nombre solo puede contener letras, números y espacios.' }),
    imageUrl: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface EditCategoryFormProps {
    category: Category;
}

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category.name || "",
            imageUrl: category.image || "",
        },
    });

    const handleUpload = (url: string | undefined) => {
        form.setValue("imageUrl", url || ""); // Actualiza el campo imageUrl en el formulario
    };

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/categories/${category.id}`, values);
            router.push(`/categories`);
            router.refresh();
            toast.success("Categoría actualizada correctamente");
        } catch (error: any) {
            toast.error("Algo salió mal.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Editar Categoría</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre de la Categoría" {...field} disabled={loading} />
                                </FormControl>
                                <FormDescription>Nombre de la categoría.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                            <FormItem>
                                <FormLabel>Imagen de la Categoría</FormLabel>
                                <OneImageUpload onUpload={handleUpload} imageUrl={form.getValues("imageUrl")} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Cargando..." : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
