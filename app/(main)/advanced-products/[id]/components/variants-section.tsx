import { Category, ProductVariant } from "@prisma/client";
import { OrderClient } from "./order-table";
import { OrderColumn } from "../types/columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Product {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    isFeature?: boolean;
    variants: ProductVariant[];
}

interface EditProductFormProps {
    data: Product;
}

function formatter(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

export default function VariantsSection({ data }: EditProductFormProps) {

    const formattedVariants: OrderColumn[] = data.variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        price: formatter(variant.price),
        stock: variant.stock,
    }));

    return (
        <>
            <Link href={`/advanced-products/variant/${data.id}`} className="w-full">
                <Button className="w-full mt-3 rounded-md h-12">Crear nueva presentación</Button>
            </Link>
            <OrderClient data={formattedVariants} />
        </>
    )
}
