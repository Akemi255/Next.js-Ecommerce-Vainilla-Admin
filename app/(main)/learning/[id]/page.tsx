import prismadb from "@/lib/prismadb";
import { notFound } from "next/navigation";
import LearningSection from "./components/learning-section";

import "./editor.css";

export default async function LearningPage({ params }: { params: { id: string } }) {

    const learningCategory = await prismadb.learningCategory.findFirst({
        where: {
            id: params.id
        },
        include: { images: true }
    })

    if (!learningCategory) {
        return notFound()
    }

    const initialData = learningCategory || undefined;

    const urls = initialData?.images.map((image) => image.url);

    return (
        <div>
            <LearningSection learningCategory={learningCategory} images={urls} />
        </div>
    );
}