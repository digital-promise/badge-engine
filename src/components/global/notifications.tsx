"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

enum NotificationTypes {
  success,
  error,
  info,
}

type Notification = {
  id: number;
  type: keyof typeof NotificationTypes;
  message: string;
};

type NotificationProps = Omit<Notification, "id">;

interface NotificationContext {
  notifications: Notification[];
  notify: (props: NotificationProps) => void;
}

export const NotificationContext = createContext<NotificationContext | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Notification[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(state.slice(1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [state]);

  function notify({ ...props }: NotificationProps) {
    const id = (state.length + 1) % Number.MAX_SAFE_INTEGER;
    setState([
      ...state,
      {
        id,
        ...props,
      },
    ]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const context = {
    notify,
    notifications: state,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context)
    throw Error(
      "The 'useNotifications' hook must be called from within the NotificationProvider",
    );

  return context;
}

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
