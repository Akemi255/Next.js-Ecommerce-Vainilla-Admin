"use client"
import { useState } from 'react';
import UploadImage from './about-image-uploaded';
import Editor from './editor';
import { About } from '@prisma/client';

interface AboutUsSectionProps {
    initialData?: About
}

export default function AboutUsSection({ initialData }: AboutUsSectionProps) {

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleUpload = (urls: string[]) => {
        setImageUrls(urls);

        //solicitud a la api

    };

    return (
        <>
            <Editor initialData={initialData} />
            <h1 className='text-center text-xl font-bold mt-6'>Imágenes de la sección</h1>
            <div className='flex justify-center items-center mt-4'>
                <UploadImage onUpload={handleUpload} imageUrls={imageUrls} />
            </div>
        </>
    )

}
