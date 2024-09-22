
import {
    Card,
    CardContent,
} from "@/components//ui/card";

import { Product } from '@prisma/client';

interface ActiveProductsProps {
    products: Product[];
}

export default function ActiveProductsChart({ products }: ActiveProductsProps) {

    const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

    return (
        <Card className="max-w-xs" x-chunk="charts-01-chunk-5">
            <CardContent className="flex gap-4 p-4">
                <div className="grid items-center gap-2">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-sm text-muted-foreground">Productos Disponibles</div>
                        <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                            {products.length}
                            <span className="text-sm font-normal text-muted-foreground">
                                disponibles
                            </span>
                        </div>
                    </div>
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                        <div className="text-sm text-muted-foreground">Cantidad en Stock</div>
                        <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                            {totalStock}
                            <span className="text-sm font-normal text-muted-foreground">
                                en stock
                            </span>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
