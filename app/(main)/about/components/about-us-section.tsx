"use client"
import { useEffect, useState } from 'react';
import UploadImage from './about-image-uploaded';
import Editor from './editor';
import { About, AboutImage } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AboutUsSectionProps {
    initialData?: About & { images: AboutImage[] };
    images?: string[]
}

export default function AboutUsSection({ initialData, images }: AboutUsSectionProps) {

    const [imageUrls, setImageUrls] = useState<string[]>(images || []);
    const [loading, setLoading] = useState(false);

    const handleUpload = (urls: string[]) => {
        setImageUrls(urls);
    };

    const sendImages = async () => {
        if (imageUrls.length === 0) {
            toast.error("No has subido ninguna imagen");
            return;
        }
        setLoading(true);
        try {
            await axios.patch('/api/about', {
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
        <>
            <Editor initialData={initialData} />
            <Separator className='mt-7' />
            <h1 className='text-center text-xl font-bold mt-6'>Imágenes de la sección sobre nosotros</h1>
            <div className='flex justify-center items-center mt-2'>
                <UploadImage onUpload={handleUpload} imageUrls={imageUrls} />
            </div>
            <div className='flex justify-center items-center mt-2 mb-3'>
                <Button onClick={sendImages} disabled={loading}>
                    {loading ? "Guardando..." : "Guardar nuevas imágenes"}
                </Button>
            </div>
        </>
    )

}
