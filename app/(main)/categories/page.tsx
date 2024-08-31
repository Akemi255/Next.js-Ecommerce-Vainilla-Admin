import prismadb from "@/lib/prismadb"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import CategoriesTable from "./components/categories-table"

export default async function CategoriesPage() {

    const categories = await prismadb.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <div>
            <Link href="/categories/new" className="w-full">
                <Button className="w-full mt-3 rounded-md h-12 mb-4">Agregar nueva categoría</Button>
            </Link>

            <CategoriesTable categories={categories} />
        </div>
    )
}
