"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

    const logout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return <Button onClick={logout}>Cerrar sesión</Button>;
}
