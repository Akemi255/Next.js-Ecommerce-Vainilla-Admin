import prismadb from "@/lib/prismadb";
import NewProductForm from "./components/new-product-form";

export default async function NewProductPage() {

    const categories = await prismadb.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <div>
            <NewProductForm categories={categories} />
        </div>
    );
}