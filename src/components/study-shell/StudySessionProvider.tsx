"use client";

import { createContext, useContext, useCallback, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { LearningCardData } from "@/content/card-types";
import { learningSections, learningSectionIdByCardId } from "@/content/learning-sections";
import { completedCardIds, createProgressStore } from "@/lib/learning-progress/progress";
import { createProgressSync } from "@/lib/learning-progress/sync-client";
import { authClient } from "@/lib/auth/client";
import { createSessionStore, filterSession, type StudySession } from "@/lib/study-session/session";
import { ensureStudyQueue } from "@/lib/study-session/study-queue";

type SessionContext = {
  mode: "study" | "review";
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
  review: {
    session: StudySession | null;
    storageAvailable: boolean;
    update: (change: (current: StudySession) => StudySession) => void;
    restart: () => void;
  };
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
  const [reviewStore] = useState(() => createSessionStore(cards, owner, undefined, "review:all"));
  const reviewSnapshot = useSyncExternalStore(reviewStore.subscribe, reviewStore.getSnapshot, reviewStore.getServerSnapshot);
  const [progressStore] = useState(() => createProgressStore(cards, learningSectionIdByCardId, owner));
  const progress = useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, progressStore.getServerSnapshot);
  const [syncStore] = useState(() => createProgressSync(owner, progressStore, {
    sections: learningSections.map(section => section.id), cardSections: learningSectionIdByCardId,
  }));
  const sync = useSyncExternalStore(syncStore.subscribe, syncStore.getSnapshot, syncStore.getServerSnapshot);
  const completed = useMemo(() => completedCardIds(progress.data.confirmations), [progress.data.confirmations]);
  const studyIds = useMemo(() => new Set(cards.filter(card => !completed.has(card.id)).map(card => card.id)), [cards, completed]);
  const session = useMemo(() => snapshot.session?.queue && progress.ready ? filterSession(snapshot.session, sync.sections, learningSectionIdByCardId, studyIds) : null, [snapshot.session, sync.sections, studyIds, progress.ready]);
  const reviewSession = useMemo(() => reviewSnapshot.session && progress.ready ? filterSession(reviewSnapshot.session, sync.sections, learningSectionIdByCardId, completed) : null, [reviewSnapshot.session, sync.sections, completed, progress.ready]);
  const update = useCallback((change: (current: StudySession) => StudySession) => store.update(current => {
    const visible = filterSession(current, sync.sections, learningSectionIdByCardId, studyIds);
    const next = change(visible);
    const merged = next === visible ? current : { ...next, order: current.order, queue: current.queue };
    return ensureStudyQueue(merged, cards, learningSectionIdByCardId, sync.sections, progress.data);
  }), [store, sync.sections, studyIds, cards, progress.data]);
  useEffect(() => {
    const waitingForFirstAccountRead = owner?.startsWith("account:") && !store.wasRestored() && !snapshot.session?.queue &&
      (sync.status === "loading" || sync.status === "syncing");
    if (progress.ready && !waitingForFirstAccountRead)
      store.update(current => ensureStudyQueue(current, cards, learningSectionIdByCardId, sync.sections, progress.data, !store.wasRestored()));
  }, [store, cards, owner, snapshot.session, sync.status, sync.sections, progress.ready, progress.data]);
  useEffect(() => {
    if (snapshot.session?.queue) progressStore.retainReviews(new Set(snapshot.session.queue.map(entry => entry.id)));
  }, [snapshot.session?.queue, progressStore]);
  const restartStudy = useCallback(() => {
    store.restart();
    store.update(current => ensureStudyQueue(current, cards, learningSectionIdByCardId, sync.sections, progress.data, true));
  }, [store, cards, sync.sections, progress.data]);
  const updateReview = useCallback((change: (current: StudySession) => StudySession) => reviewStore.update(current => {
    const visible = filterSession(current, sync.sections, learningSectionIdByCardId, completed);
    const next = change(visible);
    return next === visible ? current : { ...next, order: current.order };
  }), [reviewStore, sync.sections, completed]);
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
    ...snapshot, mode: "study" as const, session, update, restart: restartStudy, progress,
    reviewCard: progressStore.review, toggleConfirmation: progressStore.toggle,
    sync, retrySync: syncStore.retry, setSections: syncStore.setSections, resetProgress: syncStore.reset,
    review: { ...reviewSnapshot, session: reviewSession, update: updateReview, restart: reviewStore.restart },
  }), [snapshot, session, update, restartStudy, progress, progressStore, sync, syncStore, reviewSnapshot, reviewSession, updateReview, reviewStore]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

const ignoreReview = () => {};
const readOnlyConfirmation = () => "В режиме повторения прогресс не меняется.";

export function ReviewSessionProvider({ children }: { children: ReactNode }) {
  const base = useStudySession();
  const value = useMemo(() => ({ ...base, ...base.review, mode: "review" as const,
    reviewCard: ignoreReview, toggleConfirmation: readOnlyConfirmation,
  }), [base]);
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
