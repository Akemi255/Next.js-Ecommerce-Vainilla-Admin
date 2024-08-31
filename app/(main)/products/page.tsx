import Link from "next/link";
import prismadb from "@/lib/prismadb";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";

export default async function ProductsPage() {

    const products = await prismadb.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            images: true
        }
    });

    return (
        <div className="p-4">
            <Link href="/products/new" className="w-full">
                <Button className="w-full mt-3 rounded-md h-12">Crear nuevo producto</Button>
            </Link>

            <h1 className="text-2xl font-bold mb-5 mt-2">All Products</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        description={product.description}
                        images={product.images}
                        price={product.price}
                        stock={product.stock}
                        category={product.category.name}
                    />
                ))}
            </div>
        </div>
    );
}
