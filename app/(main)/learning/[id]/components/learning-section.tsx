"use client"
import { LearningCategory, LearningImage } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { AlertModal } from "@/components/modals/alert-modal";
import EditLearningModal from "@/components/modals/edit-learning-modal";
import { Button } from "@/components/ui/button";
import Editor from "./editor";
import { Separator } from "@/components/ui/separator";
import UploadImage from "./learning-image-uploaded";

interface LearningSectionProps {
    learningCategory: LearningCategory & { images: LearningImage[] }
    images: string[]
}

export default function LearningSection({ learningCategory, images }: LearningSectionProps) {

    const [loading, setLoading] = useState(false);
    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [editLearningModal, setEditLearningModal] = useState(false);
    const router = useRouter()

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/learning/${learningCategory.id}`);
            toast.success('Learning Category deleted.');
            router.push("/")
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    const [imageUrls, setImageUrls] = useState<string[]>(images || []);
    const [Imageloading, setImageLoading] = useState(false);

    const handleUpload = (urls: string[]) => {
        setImageUrls(urls);
    };

    const sendImages = async () => {
        if (imageUrls.length === 0) {
            toast.error("No has subido ninguna imagen");
            return;
        }
        setImageLoading(true);
        try {
            await axios.put(`/api/learning/${learningCategory.id}`, {
                imageUrls,
            });
            toast.success("Imágenes guardadas con éxito")
        } catch (err) {
            console.error(err);
            toast.error("Error al enviar la solicitud a la API");
        } finally {
            setImageLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={openAlertModal}
                onClose={() => setOpenAlertModal(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <EditLearningModal
                isOpen={editLearningModal}
                onClose={() => setEditLearningModal(false)}
                initialData={learningCategory}
                onConfirm={onConfirm}
                loading={loading}
            />
            <h1 className='text-center text-[30px] font-bold mt-3'>{learningCategory.name}</h1>
            <div className="flex justify-center space-x-2 mt-4">
                <Button variant="outline" onClick={() => setEditLearningModal(true)}>
                    Editar Nombre
                </Button>
                <Button variant="destructive" onClick={() => setOpenAlertModal(true)}>
                    Eliminar
                </Button>
            </div>

            <Editor initialData={learningCategory} />
            <Separator className='mt-7' />
            <h1 className='text-center text-xl font-bold mt-6'>Imágenes de la sección</h1>
            <div className='flex justify-center items-center mt-2'>
                <UploadImage onUpload={handleUpload} imageUrls={imageUrls} />
            </div>
            <div className='flex justify-center items-center mt-2 mb-3'>
                <Button onClick={sendImages} disabled={Imageloading}>
                    {loading ? "Guardando..." : "Guardar nuevas imágenes"}
                </Button>
            </div>
        </>
    );
}