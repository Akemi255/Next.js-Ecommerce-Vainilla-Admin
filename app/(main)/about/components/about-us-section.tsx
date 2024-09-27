"use client"
import { useState } from 'react';
import UploadImage from './about-image-uploaded';
import Editor from './editor';

export default function AboutUsSection() {

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleUpload = (urls: string[]) => {
        setImageUrls(urls);

        //solicitud a la api
    };

    return (
        <>
            <h1 className='text-center text-[30px] font-bold'>Texto de about</h1>
            <Editor />
            <h1 className='text-center text-xl font-bold'>Imágenes de la sección</h1>
            <div className='flex justify-center items-center mt-4'>
                <UploadImage onUpload={handleUpload} imageUrls={imageUrls} />
            </div>
        </>
    )

}
