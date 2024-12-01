import ProductVariantsForm from "./components/product-variant-form";

export default function NamePage({ params }: { params: { id: string } }) {

    const advancedProductId = params.id

    return (
        <div className="flex justify-center items-center">
            {advancedProductId && (
                <ProductVariantsForm advancedProductId={advancedProductId} />
            )}
        </div>
    );
}