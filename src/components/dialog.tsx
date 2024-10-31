"use client";

import { useRef, cloneElement as clone, type ReactElement, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function Dialog({ trigger, children } : { trigger: ReactElement, children: ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const triggerLocal = clone(trigger, { onClick: () => {
        dialogRef.current?.showModal()
    }})

    return (
        <>
            {triggerLocal}

            {createPortal(
                <dialog ref={dialogRef} className="w-[45rem] max-w-full bg-neutral-1 p-5 relative min-h-max shadow-md rounded-lg backdrop:bg-neutral-5 backdrop:opacity-45">
                    <button className="font-medium leading-none text-lg text-gray-5 absolute top-3 right-5" onClick={() => dialogRef.current?.close()}>&times;</button>
                    {children}
                </dialog>,
                document.body
            )}
        </>
    )
}