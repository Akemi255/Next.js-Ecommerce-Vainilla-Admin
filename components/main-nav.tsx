"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {

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
        },
        {
            href: `/about`,
            label: "About",
            active: pathname === `/about`
        },
        {
            href: `/our-history`,
            label: "our-history",
            active: pathname === `/our-history`
        },
    ]

    return (
        <>
            <MobileMenu />
            <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}>
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground")}
                    >
                        {route.label}
                    </Link>
                ))}
            </nav>
        </>
    )
}