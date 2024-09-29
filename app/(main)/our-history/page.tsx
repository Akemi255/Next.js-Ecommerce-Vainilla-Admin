import prismadb from "@/lib/prismadb";
import OurHistorySection from "./components/our-history-section";

import "./editor.css";

export default async function OurHistoryPage() {

    const ourHistoryText = await prismadb.ourHistory.findFirst({ include: { images: true } });

    const initialData = ourHistoryText || undefined;

    const urls = initialData?.images.map((image) => image.url);

    return (
        <div>
            <OurHistorySection initialData={initialData} images={urls} />
        </div>
    );
}
