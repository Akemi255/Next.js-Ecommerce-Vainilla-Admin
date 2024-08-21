import { auth } from "@/auth";
import VerifyEmailBox from "./components/verify-email-box";

import { verificateAccount } from "@/actions/auth-actions";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({ searchParams }: {
    searchParams: { token: string, email: string };
}) {

    const session = await auth();

    const userEmail = session?.user?.email ?? undefined;

    const user = await prismadb.user.findUnique({
        where: {
            email: userEmail,
        },
    });

    const email = user?.email ?? undefined;

    if (user?.emailVerified) {
        redirect("/");
    }

    let message = false;

    if (!searchParams.token || !searchParams.email) {
        return (
            <VerifyEmailBox searchParams={searchParams} message={message} email={email} />
        );
    }

    const result = await verificateAccount(searchParams.token, searchParams.email);

    if (result.success) {
        message = true;
    }

    return (
        <VerifyEmailBox searchParams={searchParams} message={message} email={email} />
    );
}
