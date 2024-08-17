import DeleteButton from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import prismadb from "@/lib/prismadb";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {

    const products = await prismadb.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });


    return (
        <div className="p-4">

            <Link href="/products/new" className="w-full">
                <Button className="w-full mt-3 rounded-md h-12">
                    Crear nuevo producto
                </Button>
            </Link>

            <h1 className="text-2xl font-bold mb-5 mt-2">All Products</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map(product => (
                    <Card key={product.id} className="border border-gray-200 shadow-lg rounded-lg overflow-hidden">

                        <CardHeader>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={400}
                                height={400}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <CardTitle className="text-xl font-semibold mt-2">{product.name}</CardTitle>
                            <CardDescription className="text-gray-600">{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-lg">price : {""}${product.price}</p>
                            <p className="font-bold text-lg">stock : {""}{product.stock}</p>
                        </CardContent>
                        <CardFooter>
                            <div className="flex space-x-4 justify-between">
                                <Link href={`/products/${product.id}`}>
                                    <Button className="w-full py-2 rounded-md">
                                        Editar
                                    </Button>
                                </Link>
                                <div>
                                    <DeleteButton id={product.id} />
                                </div>
                            </div>
                        </CardFooter>

                    </Card>
                ))}
            </div>

        </div>
    );
}
