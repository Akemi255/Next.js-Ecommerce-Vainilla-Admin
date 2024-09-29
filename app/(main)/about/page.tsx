import prismadb from "@/lib/prismadb";
import AboutUsSection from "./components/about-us-section";

import "./editor.css";

export default async function AboutPage() {

    const aboutText = await prismadb.about.findFirst({ include: { images: true } });

    const initialData = aboutText || undefined;

    const urls = initialData?.images.map((image) => image.url);

    return (
        <div>
            <AboutUsSection initialData={initialData} images={urls} />
        </div>
    );
}
