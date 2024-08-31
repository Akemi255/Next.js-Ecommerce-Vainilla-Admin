"use client"

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function ResetPage() {

    useEffect(() => {
        const logout = async () => {
            await signOut({
                callbackUrl: "/login",
            });
        }
        logout();
    }, [])

    return (
        <>
        </>
    );
}