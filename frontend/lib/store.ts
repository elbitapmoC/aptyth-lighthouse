import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

type ThemeState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

type StoreState = ThemeState & AuthState;

const useStore = create<StoreState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useStore;