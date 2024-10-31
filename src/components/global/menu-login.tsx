"use client";

import { useSession } from "next-auth/react";

import Icon from "~/components/icon";
import Login from "~/components/login";
import Logout from "~/components/logout";

export function MenuLogin() {
    const { data: session, status } = useSession();

    return (
        <nav className="flex items-center font-bold">
            <ul className="contents divide-x divide-gray-3">
                <li className="pr-5 text-gray-5"><Icon name="warning" /><span className="underline">Help</span></li>
                <li className="pl-5">
                    {status === "authenticated" ? <Logout>{session.user?.name}</Logout> : <Login provider="auth0">Sign In</Login>}
                </li>
            </ul>
        </nav>
    )
}