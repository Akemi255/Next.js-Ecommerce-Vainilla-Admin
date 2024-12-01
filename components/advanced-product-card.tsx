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
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    category: string;
}

export default function AdvancedProductCard({
    id,
    name,
    description,
    category
}: ProductCardProps) {
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <Card className="border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
                {/* Carrusel de imágenes */}
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full h-60 relative"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >

                    <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
                        <CarouselPrevious className="p-2 text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white absolute right-[0.5px]">
                            <ChevronLeft className="w-6 h-6" />
                        </CarouselPrevious>
                    </div>
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                        <CarouselNext className="p-2 text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white absolute left-[0.5px]">
                            <ChevronRight className="w-6 h-6" />
                        </CarouselNext>
                    </div>
                </Carousel>
                <Badge className="w-1/4 flex justify-center">{category}</Badge>
                <CardTitle className="text-xl font-semibold mt-2">{name}</CardTitle>
                <CardDescription className="text-gray-600">{description}</CardDescription>
            </CardHeader>

            <CardFooter>
                <div className="flex space-x-4 justify-between">
                    <Link href={`/advanced-products/${id}`}>
                        <Button className="w-full py-2 rounded-md">Editar</Button>
                    </Link>
                    <DeleteButton url={`/api/advanced-products/${id}`} />
                </div>
            </CardFooter>
        </Card>
    );
}
