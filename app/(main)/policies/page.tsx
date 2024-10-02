import prismadb from "@/lib/prismadb";
import PoliciesSection from "./components/policies-section";

import "./editor.css";

export default async function PoliciesPage() {
    const policies = await prismadb.policies.findFirst();


    const initialData = policies || undefined;


    return (
        <div>
            <PoliciesSection initialData={initialData} />
        </div>
    );
}
