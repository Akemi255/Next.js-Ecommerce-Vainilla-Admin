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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Category, ProductVariant } from "@prisma/client";
import VariantsSection from "./variants-section";

export const productSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    categoryId: z.string().min(1, { message: 'Category is required.' }),
    isFeature: z.boolean().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Product {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    isFeature?: boolean;
    variants: ProductVariant[]
}

interface EditProductFormProps {
    data: Product;
    categories: Category[];
}

export default function EditProductForm({ data, categories }: EditProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: data.name,
            description: data.description,
            categoryId: data.category.id,
            isFeature: data.isFeature || false,
        },
    });

    const onSubmit = async (values: ProductFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/advanced-products/${data.id}`, values);
            router.push(`/products`);
            router.refresh();
            toast.success("Producto actualizado correctamente");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Editar producto</h1>
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
                        name="isFeature"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            id="isFeature"
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked)}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormLabel htmlFor="isFeature">
                                        Feature this product
                                    </FormLabel>
                                </div>
                                <FormDescription>Este producto aparecerá en el inicio</FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={data.category.name}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormDescription>Select product category</FormDescription>
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

                    <div className="flex items-center justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Cargando..." : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </Form>
            <VariantsSection data={data} />
        </div>
    );
}
