import Link from "next/link";
import prismadb from "@/lib/prismadb";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";
import AdvancedProductCard from "@/components/advanced-product-card";

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

    const advancedproducts = await prismadb.advancedProduct.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            variants: {
                include: {
                    images: true
                }
            }
        }
    });

    const filteredAdvancedProducts = advancedproducts.filter(product => product.variants.length > 0);

    return (
        <div className="p-4">
            <Link href="/products/new" className="w-full">
                <Button className="w-full mt-3 rounded-md h-12">Crear nuevo producto</Button>
            </Link>
            <Link href="/advanced-products/new" className="w-full">
                <Button className="w-full mt-3 rounded-md h-12">Crear producto con diferentes presentaciones</Button>
            </Link>
            <Separator className="my-4" />
            <h1 className="text-2xl font-bold mb-5 mt-2 text-center">Productos con presentaciones</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredAdvancedProducts.map((product) => {
                    return (
                        <AdvancedProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            variants={product.variants}
                            category={product.category.name}

                        />
                    );
                })}
            </div>
            <Separator className="my-4" />
            <h1 className="text-2xl font-bold mb-5 mt-2 text-center">Productos Normales</h1>
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
