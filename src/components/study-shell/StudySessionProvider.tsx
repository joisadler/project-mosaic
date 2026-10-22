"use client";

import { createContext, useContext, useCallback, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { LearningCardData } from "@/content/card-types";
import { learningSections, learningSectionIdByCardId } from "@/content/learning-sections";
import { createProgressStore } from "@/lib/learning-progress/progress";
import { createProgressSync } from "@/lib/learning-progress/sync-client";
import { authClient } from "@/lib/auth/client";
import { createSessionStore, filterSession, type StudySession } from "@/lib/study-session/session";

type SessionContext = {
  session: StudySession | null;
  update: (change: (current: StudySession) => StudySession) => void;
  restart: () => void;
  storageAvailable: boolean;
  progress: ReturnType<ReturnType<typeof createProgressStore>["getSnapshot"]>;
  reviewCard: ReturnType<typeof createProgressStore>["review"];
  toggleConfirmation: ReturnType<typeof createProgressStore>["toggle"];
  sync: ReturnType<ReturnType<typeof createProgressSync>["getSnapshot"]>;
  retrySync: () => void;
  setSections: ReturnType<typeof createProgressSync>["setSections"];
  resetProgress: ReturnType<typeof createProgressSync>["reset"];
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
  const [progressStore] = useState(() => createProgressStore(cards, learningSectionIdByCardId, owner));
  const progress = useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, progressStore.getServerSnapshot);
  const [syncStore] = useState(() => createProgressSync(owner, progressStore, {
    sections: learningSections.map(section => section.id), cardSections: learningSectionIdByCardId,
  }));
  const sync = useSyncExternalStore(syncStore.subscribe, syncStore.getSnapshot, syncStore.getServerSnapshot);
  const session = useMemo(() => snapshot.session ? filterSession(snapshot.session, sync.sections, learningSectionIdByCardId) : null, [snapshot.session, sync.sections]);
  const update = useCallback((change: (current: StudySession) => StudySession) => store.update(current => {
    const visible = filterSession(current, sync.sections, learningSectionIdByCardId);
    const next = change(visible);
    return next === visible ? current : { ...next, order: current.order };
  }), [store, sync.sections]);
  useEffect(() => {
    const stop = syncStore.start();
    const retry = () => syncStore.retry();
    const resume = () => { if (document.visibilityState === "visible") retry(); };
    window.addEventListener("online", retry);
    window.addEventListener("focus", retry);
    document.addEventListener("visibilitychange", resume);
    return () => {
      stop();
      window.removeEventListener("online", retry);
      window.removeEventListener("focus", retry);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [syncStore]);
  const value = useMemo(() => ({
    ...snapshot, session, update, restart: store.restart, progress,
    reviewCard: progressStore.review, toggleConfirmation: progressStore.toggle,
    sync, retrySync: syncStore.retry, setSections: syncStore.setSections, resetProgress: syncStore.reset,
  }), [snapshot, session, update, store, progress, progressStore, sync, syncStore]);
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
