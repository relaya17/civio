import { create } from "zustand";
import type { GeneratedLetter, LetterStatus } from "@repo/types";

export type LetterFeedback = "response-received" | "no-response" | "partial-response" | null;

export interface SavedLetter extends GeneratedLetter {
  readonly id: string;
  readonly status: LetterStatus;
  readonly savedAt: number;
  readonly authorityId: string;
  readonly subject: string;
  readonly fullName: string;
  readonly feedback?: LetterFeedback;
  readonly feedbackNote?: string;
  readonly sentAt?: number;
}

const STORAGE_KEY = "civio.savedLetters.v1";

function readSavedLetters(): SavedLetter[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SavedLetter => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.status === "string" &&
        typeof item.savedAt === "number" &&
        typeof item.subject === "string" &&
        typeof item.bodyText === "string"
      );
    });
  } catch {
    return [];
  }
}

interface SavedLettersState {
  readonly letters: SavedLetter[];
  saveLetter: (letter: GeneratedLetter & { authorityId: string; fullName: string }) => SavedLetter;
  updateLetterStatus: (id: string, status: LetterStatus) => void;
  updateLetterFeedback: (id: string, feedback: LetterFeedback, note?: string) => void;
  markLetterAsSent: (id: string) => void;
  deleteLetter: (id: string) => void;
  loadLetters: () => void;
}

export const useSavedLettersStore = create<SavedLettersState>((set, get) => ({
  letters: readSavedLetters(),
  loadLetters: () => set({ letters: readSavedLetters() }),
  saveLetter: (letter) => {
    const saved: SavedLetter = {
      ...letter,
      id: `letter-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      status: "draft",
      savedAt: Date.now(),
    };
    const letters = [...get().letters, saved];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch {
      // ignore
    }
    set({ letters });
    return saved;
  },
  updateLetterStatus: (id, status) => {
    const letters = get().letters.map((l) => (l.id === id ? { ...l, status } : l));
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch {
      // ignore
    }
    set({ letters });
  },
  updateLetterFeedback: (id, feedback, note) => {
    const letters = get().letters.map((l) =>
      l.id === id ? { ...l, feedback, feedbackNote: note || undefined } : l
    );
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch {
      // ignore
    }
    set({ letters });
  },
  markLetterAsSent: (id) => {
    const letters = get().letters.map((l) =>
      l.id === id ? { ...l, status: "sent" as LetterStatus, sentAt: Date.now() } : l
    );
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch {
      // ignore
    }
    set({ letters });
  },
  deleteLetter: (id) => {
    const letters = get().letters.filter((l) => l.id !== id);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
    } catch {
      // ignore
    }
    set({ letters });
  },
}));
