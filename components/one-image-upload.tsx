"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Trash } from "lucide-react";

interface UploadImageProps {
    onUpload: (url: string | undefined) => void;
    imageUrl?: string;
}

export default function OneImageUpload({ onUpload, imageUrl = "https://i.postimg.cc/9FrGyDcD/logo.png" }: UploadImageProps) {
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(imageUrl);

    const handleUpload = (result: any) => {
        if (result.event === "success") {
            const url = result.info.secure_url;
            // Establecer la nueva imagen
            setUploadedImageUrl(url);
            if (onUpload) {
                onUpload(url);
            }
        }
    };

    const handleRemove = () => {
        setUploadedImageUrl(null);
        onUpload(undefined);
    };

    return (
        <div>
            <CldUploadWidget
                uploadPreset="axupload"
                onSuccess={handleUpload}
            >
                {({ open }) => (
                    <Button type="button" onClick={() => open()} disabled={!!uploadedImageUrl}>
                        Subir imagen
                    </Button>
                )}
            </CldUploadWidget>

            {uploadedImageUrl && (
                <div className="mt-4 relative w-[300px] h-[300px] rounded-md overflow-hidden">
                    <div className="z-10 absolute top-2 right-2">
                        <Button type="button" onClick={handleRemove} variant="destructive" size="icon">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                    <Image
                        fill
                        className="object-cover"
                        alt="Image"
                        src={uploadedImageUrl}
                        sizes="200px"
                    />
                </div>
            )}
        </div>
    );
}
