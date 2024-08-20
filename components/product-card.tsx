"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/delete-button";
import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { Badge } from "./ui/badge";

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    price: number;
    stock: number;
    category: string
}

export default function ProductCard({
    id,
    name,
    description,
    images,
    price,
    stock,
    category
}: ProductCardProps) {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <Card className="border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
                {/* Carrusel de imágenes */}
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full h-60"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <Image
                                        src={image.url}
                                        alt={name}
                                        width={400}
                                        height={400}
                                        className="w-full h-60 object-cover rounded-t-lg"
                                    />
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem>
                                <Image
                                    src="/placeholder-image.png"
                                    alt="Placeholder"
                                    width={400}
                                    height={400}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="bg-gray-800 hover:bg-gray-700" />
                    <CarouselNext className="bg-gray-800 hover:bg-gray-700" />
                </Carousel>
                <Badge className="w-1/4 flex justify-center">{category}</Badge>
                <CardTitle className="text-xl font-semibold mt-2">{name}</CardTitle>
                <CardDescription className="text-gray-600">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-bold text-lg">price : ${price}</p>
                <p className="font-bold text-lg">stock : {stock}</p>
            </CardContent>
            <CardFooter>
                <div className="flex space-x-4 justify-between">
                    <Link href={`/products/${id}`}>
                        <Button className="w-full py-2 rounded-md">Editar</Button>
                    </Link>
                    <DeleteButton id={id} />
                </div>
            </CardFooter>
        </Card>
    );
}
