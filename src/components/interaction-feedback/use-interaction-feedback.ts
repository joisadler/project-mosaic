"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { getPreferenceSnapshot, getServerPreferenceSnapshot, subscribeToPreferences, type FeedbackPreferenceSnapshot } from "@/lib/interaction-feedback/preferences";
import { createFeedbackPlayer, type FeedbackKind } from "@/lib/interaction-feedback/player";

export function useFeedbackPreferences() {
  const snapshot = useSyncExternalStore(subscribeToPreferences, getPreferenceSnapshot, getServerPreferenceSnapshot);
  return JSON.parse(snapshot) as FeedbackPreferenceSnapshot;
}

export function useInteractionFeedback(active = true) {
  const [player] = useState(createFeedbackPlayer);
  useEffect(() => {
    const onVisibility = () => { if (document.hidden) player.stop(); };
    const unsubscribe = subscribeToPreferences(player.stop);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", onVisibility);
      player.close();
    };
  }, [player]);
  useEffect(() => { if (!active) player.stop(); }, [active, player]);
  return useCallback((kind: FeedbackKind) => {
    if (!active) return;
    const preferences = JSON.parse(getPreferenceSnapshot()) as FeedbackPreferenceSnapshot;
    void player.play(kind, preferences);
  }, [active, player]);
}
