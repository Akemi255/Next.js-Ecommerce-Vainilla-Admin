"use client"

import AverageChart from "./average-chart"
import ActiveProductsChart from "./active-products-chart"
import SalesBarChart from "./sales-bar-chart"

import { Order, Product } from "@prisma/client"

interface ChartsProps {
    orders: Order[]
    products: Product[]
}

export default function Charts({ products, orders }: ChartsProps) {

    return (
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
            <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                <AverageChart />
            </div>
            <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
                <SalesBarChart orders={orders} />
            </div>
            <div className="grid w-full flex-1 gap-6">
                <ActiveProductsChart products={products} />
            </div>
        </div>
    )
}
