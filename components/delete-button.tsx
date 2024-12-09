"use client"
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "./modals/alert-modal";
import { useState } from "react";

interface DeleteButtonProps {
    url: string
}

export default function DeleteButton({ url }: DeleteButtonProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`${url}`);
            router.refresh();
            toast.success("Producto eliminado con éxito")
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Error al eliminar el producto, elimine todas sus variantes primero")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                loading={loading}
            />
            <Button variant="destructive" className=" w-full py-2 rounded-md" onClick={() => setOpen(true)}>
                Delete
            </Button>
        </>
    )
}
