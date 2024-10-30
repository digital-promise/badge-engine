"use client";

import Image from 'next/image';
import ccByIcon from 'public/CC-BY.png';

export function DashboardFooter() {
    return (
        <footer className="flex flex-col gap-5 bg-gray-1 text-gray-5 text-sm py-6 px-6 md:px-10">
            <nav className="w-[75rem] max-w-full mx-auto flex">
                <ul className="contents divide-x divide-gray-3">
                    <li className="pr-5">&copy; Copyright Digital Promise</li>
                    <li className="px-5"><a className="underline" href="https://digitalpromise.org" target="_blank">Digital Promise Home</a></li>
                    <li className="px-5"><a className="underline" target="_blank" href="https://digitalpromisehelp.zendesk.com/">Contact Us</a></li>
                    <li className="pl-5"><a className="underline" target="_blank" href="https://digitalpromise.org/terms-of-use">Terms of Use</a></li>
                </ul>
            </nav>
            <div className="w-[75rem] max-w-full mx-auto flex items-center gap-5">
                <Image width={88} height={31} src={ccByIcon} alt="" />

                <p>Except where otherwise noted, content on this site is licensed under a <a className="underline" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="license noopener noreferrer">Creative Commons Attribution-NonCommercial 4.0 International License</a></p>
            </div>
        </footer>
    )
}