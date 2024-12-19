"use client";

import { useNotifications } from "~/providers/notification-provider";

export function Notifications() {
  const { notifications } = useNotifications();

  return (
    <aside className="absolute left-1/2 -translate-x-1/2 top-[5.5rem] flex flex-col gap-3 pointer-events-none z-10">
      {notifications.map((n) => {
        let typeStyle = "";
        switch (n.type) {
          case "error":
            typeStyle = "text-red-5 bg-red-1 border-red-3";
            break;
          case "success":
            typeStyle = "text-green-5 bg-green-1 border-green-3";
            break;
          case "info":
          default:
            typeStyle = "text-blue-5 bg-blue-1 border-blue-3";
            break;
        }

        const notificationStyle = `w-max rounded-lg border px-4 py-3 font-medium ${typeStyle}`;

        return (
          <p className={notificationStyle} key={n.id}>
            {n.message}
          </p>
        );
      })}
    </aside>
  );
}
