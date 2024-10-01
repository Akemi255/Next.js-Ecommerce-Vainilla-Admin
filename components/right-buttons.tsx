"use client";
import { signOut } from "next-auth/react";

import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import LearningToggle from "./learning-toggle";
import { LearningCategory } from "@prisma/client";

interface RightButtonsProps {
    email: string
    learningCategories: LearningCategory[]
}

export default function RightButtons({ email, learningCategories }: RightButtonsProps) {

    const logout = async () => {
        await signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <>
            <LearningToggle learningCategories={learningCategories} />
            <ModeToggle />
            <Button onClick={logout}>Cerrar sesión</Button>
        </>
    );
}
