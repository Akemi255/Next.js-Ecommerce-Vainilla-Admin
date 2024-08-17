import prismadb from "@/lib/prismadb";
import EditProductForm from "./components/edit-product-form";

export default async function ProductPage({
    params
}: {
    params: { id: string }
}) {

    const product = await prismadb.product.findUnique({
        where: {
            id: params.id,
        },
    });

    return (
        <div>
            <EditProductForm data={product} />
        </div>
    );
}