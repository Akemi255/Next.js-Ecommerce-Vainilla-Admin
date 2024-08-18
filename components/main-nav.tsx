"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        }
    ]

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
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
    )
}