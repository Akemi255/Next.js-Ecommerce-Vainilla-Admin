"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Trash } from "lucide-react";

interface UploadImageProps {
    onUpload: (urls: string[]) => void;
    imageUrls?: string[];
}

export default function UploadImage({ onUpload, imageUrls = [] }: UploadImageProps) {
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>(imageUrls);

    const handleUpload = (result: any) => {
        if (result.event === "success") {
            const url = result.info.secure_url;
            // Añadir la nueva imagen al array existente
            setUploadedImageUrls((prevUrls) => {
                const updatedUrls = [...prevUrls, url];
                if (onUpload) {
                    onUpload(updatedUrls);
                }
                return updatedUrls;
            });
        }
    };

    const handleRemove = (url: string) => {
        const updatedUrls = uploadedImageUrls.filter((imgUrl) => imgUrl !== url);
        setUploadedImageUrls(updatedUrls);
        onUpload(updatedUrls);
    };

    return (
        <div>
            <div className="flex justify-center items-center">
                <CldUploadWidget
                    uploadPreset="axupload"
                    onSuccess={handleUpload}
                >
                    {({ open }) => (
                        <Button type="button" onClick={() => open()}>
                            Subir imagen
                        </Button>
                    )}
                </CldUploadWidget>
            </div>

            {uploadedImageUrls.length > 0 && (
                <div className="mt-4 flex flex-row flex-wrap gap-4">
                    {uploadedImageUrls.map((url) => (
                        <div key={url} className="relative w-[500px] h-[500px] rounded-md overflow-hidden">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => handleRemove(url)} variant="destructive" size="icon">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Image"
                                src={url}
                                sizes="200px"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
