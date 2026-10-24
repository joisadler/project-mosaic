export type FeedbackPreferences = { sound: boolean; haptics: boolean };
export type FeedbackPreferenceSnapshot = FeedbackPreferences & { storageAvailable: boolean };

const storageKey = "mosaic.interaction-feedback.v1";
const changeEvent = "mosaic-feedback-preferences-change";
const defaults = { sound: false, haptics: false };
let temporaryPreferences: FeedbackPreferences | null = null;

function parsePreferences(raw: string | null): FeedbackPreferences {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object") return defaults;
    return {
      sound: "sound" in value && value.sound === true,
      haptics: "haptics" in value && value.haptics === true,
    };
  } catch { return defaults; }
}

export function getPreferenceSnapshot(): string {
  if (temporaryPreferences) return JSON.stringify({ ...temporaryPreferences, storageAvailable: false });
  try {
    return JSON.stringify({ ...parsePreferences(localStorage.getItem(storageKey)), storageAvailable: true });
  } catch { return JSON.stringify({ ...defaults, storageAvailable: false }); }
}

export const getServerPreferenceSnapshot = () => JSON.stringify({ ...defaults, storageAvailable: true });

export function subscribeToPreferences(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

export function savePreferences(preferences: FeedbackPreferences) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(preferences));
    temporaryPreferences = null;
  } catch { temporaryPreferences = preferences; }
  window.dispatchEvent(new Event(changeEvent));
}
