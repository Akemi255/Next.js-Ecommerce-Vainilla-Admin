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
        include: {
            images: true,
        }
    });

    if (!product) {
        return (
            <div>
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div>
            <EditProductForm data={product} />
        </div>
    );
}