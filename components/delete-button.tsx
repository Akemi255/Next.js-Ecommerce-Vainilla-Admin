"use client"
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface DeleteButtonProps {
    id: string
}

export default function DeleteButton({ id }: DeleteButtonProps) {

    const router = useRouter();

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/products/${id}`);
            router.refresh();
            toast.success("Producto eliminado con éxito")
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <Button variant="destructive" className=" w-full py-2 rounded-md" onClick={() => handleDelete(id)}>
                Delete
            </Button>
        </>
    )
}
