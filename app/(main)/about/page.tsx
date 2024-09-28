import prismadb from "@/lib/prismadb";
import AboutUsSection from "./components/about-us-section";

import "./editor.css";

export default async function AboutPage() {

    const aboutText = await prismadb.about.findFirst();

    const initialData = aboutText || undefined;

    return (
        <div>
            <AboutUsSection initialData={initialData} />
        </div>
    );
}
