"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { LearningCardData } from "@/content/card-types";
import { authClient } from "@/lib/auth/client";
import { createSessionStore, type StudySession } from "@/lib/study-session/session";

type SessionContext = {
  session: StudySession | null;
  update: (change: (current: StudySession) => StudySession) => void;
  restart: () => void;
  storageAvailable: boolean;
};

const Context = createContext<SessionContext | null>(null);

export function useStudySession() {
  const value = useContext(Context);
  if (!value) throw new Error("Study session requires StudySessionProvider");
  return value;
}

type ProviderProps = { cards: readonly LearningCardData[]; children: ReactNode };

function OwnerSession({ cards, children, owner }: ProviderProps & { owner: string | null }) {
  const [store] = useState(() => createSessionStore(cards, owner));
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const value = useMemo(() => ({ ...snapshot, update: store.update, restart: store.restart }), [snapshot, store]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function AuthenticatedSession(props: ProviderProps) {
  const { data, isPending, error } = authClient.useSession();
  // Never restore a cached account's learning state before identity is confirmed.
  const owner = error ? "unavailable" : isPending ? null : data?.user ? `account:${data.user.id}` : "guest";
  return <OwnerSession key={owner ?? "pending"} {...props} owner={owner} />;
}

export function StudySessionProvider({ authConfigured, ...props }: ProviderProps & { authConfigured: boolean }) {
  return authConfigured ? <AuthenticatedSession {...props} /> : <OwnerSession {...props} owner="guest" />;
}
