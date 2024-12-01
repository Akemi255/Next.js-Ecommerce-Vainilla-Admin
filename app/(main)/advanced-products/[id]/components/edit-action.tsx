"use client";

import { Pencil } from "lucide-react";

import { OrderColumn } from "../types/columns";
import { useRouter } from "next/navigation";

interface CellActionProps {
    data: OrderColumn;
}

export const EditAction: React.FC<CellActionProps> = ({
    data,
}) => {
    const router = useRouter()

    return (
        <>
            <Pencil className="mr-2 h-4 w-4 cursor-pointer relative left-4" onClick={() => router.push(`/advanced-products/variant/edit/${data.id}`)} />
        </>
    );
};