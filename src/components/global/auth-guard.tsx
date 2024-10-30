import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import Forbidden from "~/components/errors/403";
import { getServerAuthSession } from "~/server/auth";

export default async function WithAuthorization({ role, children } : { role?: string | string[], children?: ReactNode }) {
    const session = await getServerAuthSession()

    if (!session) redirect('/api/auth/signin')

    const { user } = session

    if (
        (typeof role === 'string' && session.user.role !== role) ||
        (Array.isArray(role) && false === role.includes(user.role!))
    ) {
        return <Forbidden />
    }


    /**
     * Render inner components if auth checks have passed.
     */
    return <>{children}</>
}