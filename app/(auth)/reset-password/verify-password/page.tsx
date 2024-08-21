import { redirect } from "next/navigation";
import UpdatePasswordForm from "./components/update-password-form";
import { VerificateUpdate } from "@/actions/auth-actions";
import prismadb from "@/lib/prismadb";

export default async function VerifyPasswordPage({ searchParams }: { searchParams: { token: string; email: string } }) {

    const user = await prismadb.user.findUnique({
        where: {
            email: searchParams.email,
        },
    });

    if (!user) {
        redirect("/login")
    }


    if (!searchParams) {
        redirect("/login")
    }

    const result = await VerificateUpdate(searchParams.token, searchParams.email);

    if (!result) {
        redirect("/login")
    }

    return <UpdatePasswordForm email={searchParams.email} searchParamsToken={searchParams.token} />
}
