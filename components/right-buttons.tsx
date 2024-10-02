"use client";
import { signOut } from "next-auth/react";

import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import LearningToggle from "./learning-toggle";
import { LearningCategory } from "@prisma/client";
import { LogOut } from "lucide-react";

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
            <Button className="lg:flex md:hidden flex" onClick={logout}>Cerrar sesión</Button>
            <LogOut className="cursor-pointer hidden md:flex lg:hidden" onClick={logout} />
        </>
    );
}
