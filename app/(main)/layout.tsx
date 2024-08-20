
import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";

export default async function MainLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();
    const userEmail = session?.user?.email ?? undefined;

    if (!userEmail) {
        redirect("/login");
    }

    const user = await prismadb.user.findUnique({
        where: {
            email: userEmail,
        },
    });

    if (!user?.emailVerified) {
        redirect("/verify-email");
    }

    if (user.role !== "admin") {
        redirect("/no-valid")
    }

    return (
        <div>
            <Navbar email={user.email} />
            {children}
        </div>
    );
}
