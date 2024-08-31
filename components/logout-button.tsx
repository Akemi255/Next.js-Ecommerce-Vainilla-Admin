"use client";
import { signOut } from "next-auth/react";

import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export default function RightButtons({ email }: { email: string }) {

    const logout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <>
            <ModeToggle />
            <Button onClick={logout}>Cerrar sesión</Button>
        </>
    );
}
