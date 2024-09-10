"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/modals/alert-modal";

import { OrderColumn } from "../types/columns";
import { useRouter } from "next/navigation";

interface CellActionProps {
    data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data,
}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/orders/${data.id}`);
            toast.success('Order deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
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
                onConfirm={onConfirm}
                loading={loading}
            />
            <Trash className="mr-2 h-4 w-4 cursor-pointer relative left-4" onClick={() => setOpen(true)} />
        </>
    );
};