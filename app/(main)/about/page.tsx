import prismadb from "@/lib/prismadb";
import AboutUsSection from "./components/about-us-section";

import "./editor.css";
import LogoSection from "./components/logo-section";
import { createLogo } from "@/actions/create-logo";

export default async function AboutPage() {

    const aboutText = await prismadb.about.findFirst({ include: { images: true } });

    const initialData = aboutText || undefined;

    const urls = initialData?.images.map((image) => image.url);

    let logo = await prismadb.logo.findFirst() || await createLogo();

    return (
        <div>
            <LogoSection logo={logo} />
            <AboutUsSection initialData={initialData} images={urls} />
        </div>
    );
}
