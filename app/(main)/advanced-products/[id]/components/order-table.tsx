"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns, OrderColumn } from "../types/columns";
import { Separator } from "@/components/ui/separator";

interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    return (
        <>
            <Separator className="my-2 mt-5" />
            <h1 className="text-center font-bold text-xl">Presentaciones del producto</h1>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};