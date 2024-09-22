import React from "react";
import {
    Bar,
    BarChart,
    Rectangle,
    XAxis,
} from "recharts";

import {
    ChartContainer,
} from "@/components//ui/chart";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components//ui/card";
import { Order } from "@prisma/client";

interface SalesBarProps {
    orders: Order[];
}

const processSalesData = (orders: Order[]) => {
    const salesByDate: { [key: string]: number } = {};

    orders.forEach(order => {
        const date = new Date(order.createdAt).toISOString().split("T")[0];
        // se cuenta la cantidad de órdenes pagadas por día.
        salesByDate[date] = (salesByDate[date] || 0) + 1;
    });

    // Convertir el objeto en un array de objetos para el gráfico
    return Object.entries(salesByDate).map(([date, sales]) => ({ date, sales }));
};

const SalesBarChart = ({ orders }: SalesBarProps) => {

    const salesData = processSalesData(orders);

    return (
        <Card className="max-w-xs" x-chunk="charts-01-chunk-3">
            <CardHeader className="p-4 pb-0">
                <CardTitle>Ventas Diarias Promedio</CardTitle>
                <CardDescription>
                    En los últimos 7 días, tus ventas diarias han sido:
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                    {salesData.length}
                    <span className="text-sm font-normal text-muted-foreground">
                        órdenes
                    </span>
                </div>
                <ChartContainer
                    config={{
                        sales: {
                            label: "Órdenes",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="ml-auto w-[72px]"
                >
                    <BarChart
                        accessibilityLayer
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        data={salesData}
                    >
                        <Bar
                            dataKey="sales"
                            fill="var(--color-sales)"
                            radius={2}
                            fillOpacity={0.2}
                            activeIndex={6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            hide
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default SalesBarChart;
