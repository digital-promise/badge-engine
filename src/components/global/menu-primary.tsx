"use client";

import { usePathname } from "next/navigation"
import Link from "next/link"

const menuItems : [string, string][] = [
    ["/issuers", "Issuing Orgs"],
    ["/reports", "Analysis & Reports"]
]

export function MenuPrimary() {
    const currentPathname = usePathname()
    return (
        <ul className="contents">
            {menuItems.map((item, i) => {
                const [pathname, label] = item
                let className = 'flex flex-col items-center justify-center px-3 h-[4.4375rem]'
                if (currentPathname.startsWith(pathname)) {
                    className += ' border-b-4 border-blue-3 text-primary'
                }
                return <li key={i} className={className}><Link className="font-bold" href={pathname}>{label}</Link></li>
            })}
        </ul>
    )
}