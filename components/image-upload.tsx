"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface UploadImageProps {
  onUpload: (url: string) => void;
  imageUrl?: string;
}

export default function UploadImage({ onUpload, imageUrl }: UploadImageProps) {
  const [ImageUrl, setImageUrl] = useState(imageUrl || "");

  const handleUpload = (result: any) => {
    if (result.event === "success") {
      const url = result.info.secure_url;
      setImageUrl(url);
      if (onUpload) {
        onUpload(url);
      }
    }
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="axupload"
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open()}>
            Upload Image
          </Button>
        )}
      </CldUploadWidget>

      {(ImageUrl || imageUrl) && (
        <div className="mt-4">
          <Image
            width={200}
            height={200}
            src={ImageUrl}
            alt="Uploaded Image"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}
