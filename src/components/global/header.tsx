"use client";

import Image from "next/image";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

import { MenuLogin } from "~/components/global/menu-login";
import { MenuPrimary } from "~/components/global/menu-primary";
import badgeEngineLogo from "public/primary-badge-engine-logo-color.svg"

export function DashboardHeader() {
    return (
        <header className="flex items-center justify-between px-[max(1.5rem,calc((100vw-75rem)/2))] border-b border-gray-2 font-bold">
            <nav className="flex items-center gap-5">
                <ul className="contents">
                    <li className="mr-5"><Link href="/"><Image src={badgeEngineLogo} width={192} height={48} alt="Badge Engine" /></Link></li>
                </ul>
                <MenuPrimary />
            </nav>
            <SessionProvider>
                <MenuLogin />
            </SessionProvider>
        </header>
    )
}