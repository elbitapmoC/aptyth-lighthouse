import { create } from "zustand";

interface AppState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  user: { id: string; name: string; email: string } | null;
  setUser: (user: { id: string; name: string; email: string } | null) => void;
  resetState: () => void;
}

/**
 * Zustand store for managing global application state.
 */
const useStore = create<AppState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  user: null,
  setUser: (user) => set({ user }),
  resetState: () =>
    set({
      theme: "light",
      user: null,
    }),
}));

export default useStore;
