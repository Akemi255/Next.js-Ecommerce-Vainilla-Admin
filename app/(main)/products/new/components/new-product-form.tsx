"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/image-upload";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const productSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    price: z.coerce.number().min(1, { message: 'Price must be at least 1.' }),
    stock: z.number().min(0, { message: 'Stock cannot be negative.' }),
    imageUrl: z.string().url({ message: 'Invalid URL.' }),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function EditProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            imageUrl: "",
        },
    });

    const onSubmit = async (values: ProductFormValues) => {
        try {
            setLoading(true);
            await axios.post(`/api/products`, values);
            router.push(`/`);
            router.refresh();
            toast.success("Producto creado correctamente");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (url: string) => {
        form.setValue("imageUrl", url);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Crear producto</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Gourmet Vanilla" {...field} disabled={loading} />
                                </FormControl>
                                <FormDescription>Product name</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <UploadImage onUpload={handleImageUpload} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Natural Grade A vanilla pods." {...field} disabled={loading} />
                                </FormControl>
                                <FormDescription>Product description</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="20.00"
                                        {...field}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormDescription>Product price</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="1"
                                        {...field}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormDescription>Product stock quantity</FormDescription>
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
