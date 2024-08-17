import { redirect } from "next/navigation";
import UpdatePasswordForm from "./components/update-password-form";
import { VerificateUpdate } from "@/actions/auth-actions";



export default async function VerifyPasswordPage({ searchParams }: { searchParams: { token: string; email: string } }) {

    if (!searchParams) {
        redirect("/login")
    }


    const result = await VerificateUpdate(searchParams.token, searchParams.email);

    if (!result) {
        redirect("/login")
    }

    return <UpdatePasswordForm email={searchParams.email} searchParamsToken={searchParams.token} />
}
