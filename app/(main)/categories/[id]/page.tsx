import prismadb from "@/lib/prismadb";
import EditCategoryForm from "./components/edit-category-form";

export default async function EditCategoriePage({ params }: { params: { id: string } }) {

    const categorie = await prismadb.category.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!categorie) {
        return (
            <div>
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div>
            <EditCategoryForm category={categorie} />
        </div>
    );
}