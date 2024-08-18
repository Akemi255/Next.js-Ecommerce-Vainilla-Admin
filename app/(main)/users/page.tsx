import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import RolesSection from "./components/roles-section";

export default async function UsersPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const userEmail = session?.user?.email ?? undefined;

    if (!userEmail) {
        redirect("/login");
    }

    // Realiza la consulta a la base de datos para obtener los usuarios
    const users = await prismadb.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            emailVerified: true,
            name: true,
        },
    });

    // Enviar los usuarios como prop a RolesSection
    return (
        <div>
            <RolesSection email={userEmail} users={users} />
        </div>
    );
}
