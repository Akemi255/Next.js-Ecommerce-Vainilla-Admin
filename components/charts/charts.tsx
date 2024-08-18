"use client"

import StepsBarChart from "./stepts-bar-chart"
import AverageChart from "./average-chart"
import ActiveProductsChart from "./active-products-chart"

export default function Charts() {
    return (
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
            <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                <AverageChart />
            </div>
            <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">

                <StepsBarChart />

            </div>
            <div className="grid w-full flex-1 gap-6">
                <ActiveProductsChart />
            </div>
        </div>
    )
}
