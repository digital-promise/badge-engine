import Link from "next/link"

export default function ButtonLink ({
    children,
    href,
    className
}: {
    href: string,
    className?: string,
    children: React.ReactNode
}) {
    return (
        <Link className={`font-bold text-neutral-1 rounded-3xl py-2 px-5 ${className}`} href={href}>
            {children}
        </Link>
    )
}