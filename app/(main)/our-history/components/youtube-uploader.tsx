import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

const youtubeSchema = z.object({
    url: z
        .string()
        .optional()
        .refine(
            (url) =>
                !url ||
                url.includes("youtube.com") ||
                url.includes("youtu.be"),
            {
                message: "La URL debe ser un enlace de YouTube válido o estar vacía",
            }
        ),
});

type YoutubeFormValues = z.infer<typeof youtubeSchema>;

interface YoutubeUploaderProps {
    url?: string;
}

export default function YoutubeUploader({ url }: YoutubeUploaderProps) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<YoutubeFormValues>({
        resolver: zodResolver(youtubeSchema),
        defaultValues: { url },
    });

    const convertToEmbedUrl = (url?: string): string | undefined => {
        if (!url) return undefined;
        const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
        const paramsMatch = url.split("?")[1];
        if (!videoIdMatch) return url;

        const videoId = videoIdMatch[1];
        const baseEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
        return paramsMatch ? `${baseEmbedUrl}?${paramsMatch}` : baseEmbedUrl;
    };

    const onSubmit = async (data: YoutubeFormValues) => {
        try {
            setLoading(true);
            const embedUrl = convertToEmbedUrl(data.url);
            await axios.post("/api/our-history/yt", {
                youtubeUrl: embedUrl || null,
            });
            toast.success("Contenido guardado");
        } catch (error) {
            toast.error("Ups... algo salió mal");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-md p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    Subir enlace de YouTube
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="youtube-url"
                            className="block text-sm font-medium"
                        >
                            URL de YouTube (puede estar vacía)
                        </label>
                        <Input
                            id="youtube-url"
                            placeholder="https://youtube.com/..."
                            {...register("url")}
                            className="mt-1 sm:w-96 w-full"
                        />
                        {errors.url && (
                            <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full font-medium py-2 rounded-lg shadow-sm transition-colors"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Actualizar cambios"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
