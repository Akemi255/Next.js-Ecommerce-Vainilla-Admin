"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";

const categorySchema = z.object({
    categoryName: z.string()
        .min(1, { message: 'El nombre es obligatorio.' })
        .trim()
        .regex(/^[a-zA-Z0-9\s]+$/, { message: 'El nombre no puede contener tildes ni caracteres especiales.' }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CreateLearningProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateLearningModal({
    isOpen,
    onClose,
}: CreateLearningProps) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            categoryName: "",
        },
    });

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            setLoading(true);
            await axios.post(`/api/learning`, values);
            router.refresh();
            toast.success("Categoría creada correctamente");
            form.reset();
            onClose();
        } catch (error) {
            toast.error("Algo salió mal.");
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Crea una historia ancestral"
            description="Introduce el nombre de la historia."
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="categoryName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        id="categoryName"
                                        placeholder="Enter category name..."
                                        {...field}
                                        disabled={loading || form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                        <Button
                            disabled={loading || form.formState.isSubmitting}
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={loading || form.formState.isSubmitting}
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}
