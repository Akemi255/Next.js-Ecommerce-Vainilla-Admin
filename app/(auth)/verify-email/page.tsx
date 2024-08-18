import VerifyEmailBox from "./components/verify-email-box";

import { verificateAccount } from "@/actions/auth-actions";

export default async function VerifyEmailPage({ searchParams }: {
    searchParams: { token: string, email: string };
}) {

    const result = await verificateAccount(searchParams.token, searchParams.email);
    let message = false;

    if (result.success) {
        message = true;
    }

    return (
        <VerifyEmailBox searchParams={searchParams} message={message} />
    );
}
