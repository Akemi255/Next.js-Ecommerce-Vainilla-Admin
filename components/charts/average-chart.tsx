import {
    Bar,
    BarChart,
    Label,
    Rectangle,
    ReferenceLine,
    XAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components//ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components//ui/chart"

export default function SalesChart() {
    return (
        <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
            <CardHeader className="space-y-0 pb-2">
                <CardDescription>Hoy</CardDescription>
                <CardTitle className="text-4xl tabular-nums">
                    $12,584{" "}
                    <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                        en ventas
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        sales: {
                            label: "Ventas",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                >
                    <BarChart
                        accessibilityLayer
                        margin={{
                            left: -4,
                            right: -4,
                        }}
                        data={[
                            {
                                date: "2024-01-01",
                                sales: 2000,
                            },
                            {
                                date: "2024-01-02",
                                sales: 2100,
                            },
                            {
                                date: "2024-01-03",
                                sales: 2200,
                            },
                            {
                                date: "2024-01-04",
                                sales: 1300,
                            },
                            {
                                date: "2024-01-05",
                                sales: 1400,
                            },
                            {
                                date: "2024-01-06",
                                sales: 2500,
                            },
                            {
                                date: "2024-01-07",
                                sales: 1600,
                            },
                        ]}
                    >
                        <Bar
                            dataKey="sales"
                            fill="var(--color-sales)"
                            radius={5}
                            fillOpacity={0.6}
                            activeBar={<Rectangle fillOpacity={0.8} />}
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            tickFormatter={(value) => {
                                return new Date(value).toLocaleDateString("es-ES", {
                                    weekday: "short",
                                })
                            }}
                        />
                        <ChartTooltip
                            defaultIndex={2}
                            content={
                                <ChartTooltipContent
                                    hideIndicator
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("es-ES", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                            cursor={false}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1">
                <CardDescription>
                    En los últimos 7 días, has generado{" "}
                    <span className="font-medium text-foreground">$53,305</span> en ventas.
                </CardDescription>
            </CardFooter>
        </Card>
    )
}
