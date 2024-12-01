"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AdvancedProductImage, ProductVariant } from "@prisma/client";
import UploadImage from "@/components/image-upload";

export const variantSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    price: z.coerce.number().min(1, { message: 'Price must be at least 1.' }),
    stock: z.number().min(0, { message: 'Stock cannot be negative.' }),
    images: z.array(z.string().url()).nonempty({ message: 'At least one image URL is required.' }),
});

type VariantFormValues = z.infer<typeof variantSchema>;

interface ProductVariantsFormProps {
    data: Props
}

interface Props {
    id: string
    name: string;
    price: number;
    stock: number;
    images: AdvancedProductImage[]
}

export default function EditProductVariantsForm({ data }: ProductVariantsFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<VariantFormValues>({
        resolver: zodResolver(variantSchema),
        defaultValues: {
            name: data.name,
            price: data.price,
            stock: data.stock,
            images: data.images.map((img: any) => img.url),
        },
    });

    const onSubmit = async (values: VariantFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/product-variant/${data.id}`, {
                ...values
            });
            router.push(`/products`);
            router.refresh();
            toast.success("Variant added successfully.");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (urls: string[]) => {
        const validUrls: [string, ...string[]] = urls.length > 0 ? (urls as [string, ...string[]]) : ["default-image-url"];
        form.setValue("images", validUrls);
    };

    return (
        <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-semibold">Add Product Variants</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Variant Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Size or type (e.g., Small, XL)"
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
                        name="images"
                        render={() => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <UploadImage
                                    onUpload={handleImageUpload}
                                    imageUrls={form.getValues("images")}
                                />
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
                                        placeholder="e.g., 19.99"
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Edit Variant"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
