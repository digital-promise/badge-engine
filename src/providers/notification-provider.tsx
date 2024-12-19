"use client";

import {
  createContext,
  type ReactNode,
  useContext,
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

    const _timeout = setTimeout(
      () => setState(state.filter((n) => n.id !== id)),
      5000,
    );
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
