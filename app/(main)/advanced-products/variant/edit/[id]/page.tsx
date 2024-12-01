import prismadb from "@/lib/prismadb";
import EditProductVariantsForm from "./components/edit-product-variant-form";


export default async function EditVariantPage({ params }: { params: { id: string } }) {

    const variantProduct = await prismadb.productVariant.findFirst({
        where: {
            id: params.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            images: true
        }
    })

    if (!variantProduct) {
        return (
            <div className="flex justify-center items-center">
                <p className="text-red-500">Product variant not found.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center">
            <EditProductVariantsForm data={variantProduct} />
        </div>
    );
}