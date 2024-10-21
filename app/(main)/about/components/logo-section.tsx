"use client"
import OneImageUpload from "@/components/one-image-upload";
import { Button } from "@/components/ui/button";
import { Logo } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface LogoSectionProps {
    logo?: Logo
}

export default function LogoSection({ logo }: LogoSectionProps) {

    const [imageUrls, setImageUrls] = useState<string | undefined>(logo?.imageUrl);
    const [loading, setLoading] = useState(false);

    const handleUpload = (url: string | undefined) => {
        setImageUrls(url);
    };

    const sendImages = async () => {
        if (imageUrls?.length === 0) {
            toast.error("No has subido ninguna imagen");
            return;
        }
        setLoading(true);
        try {
            await axios.post('/api/logo', {
                imageUrls,
            });
            toast.success("Imágenes guardadas con éxito")
        } catch (err) {
            console.error(err);
            toast.error("Error al enviar la solicitud a la API");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <h1 className='text-center text-[30px] font-bold mt-3'>Logo del sitio</h1>

            <div className="flex justify-center mt-4">
                {/* Componente de subida de imagen */}
                <OneImageUpload onUpload={handleUpload} imageUrl={imageUrls} />
            </div>

            <div className="mt-4 flex justify-center">
                <Button
                    onClick={sendImages}
                    disabled={loading}
                    className="px-4 py-2 rounded-md"
                >
                    {loading ? "Guardando..." : "Guardar Logo"}
                </Button>
            </div>

        </div>
    )
}
