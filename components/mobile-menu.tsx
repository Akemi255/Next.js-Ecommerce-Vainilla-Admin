"use client"
import { Category } from "@prisma/client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export function MobileMenu() {

    const pathname = usePathname();

    const routes = [
        {
            href: `/`,
            label: "Overview",
            active: pathname === `/`
        },
        {
            href: `/products`,
            label: "Productos",
            active: pathname === `/products`
        },
        {
            href: `/orders`,
            label: "Ordenes",
            active: pathname === `/orders`
        }, {
            href: `/users`,
            label: "Usuarios",
            active: pathname === `/users`
        },
        {
            href: `/categories`,
            label: "Categorías",
            active: pathname === `/categories`
        }
    ]

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden flex border-none">
                    <Menu className="mr-2" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col h-full">
                <nav className="mt-4 flex-grow">
                    <ul className="space-y-4">
                        <li>
                            <ul className="ml-4 mt-2 space-y-2">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn("rounded cursor-pointer block py-2", route.active ? "text-black dark:text-white" : "text-muted-foreground")}
                                    >
                                        {route.label}
                                    </Link>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
