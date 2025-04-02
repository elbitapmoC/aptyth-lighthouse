import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// --- State Types ---

interface AuthSlice {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null; // Example user structure
  token: string | null;
  authActions: {
    // Renamed actions
    login: (user: { id: string; email: string }, token: string) => void;
    logout: () => void;
  };
}

interface UISlice {
  isSidebarOpen: boolean;
  uiActions: {
    // Renamed actions
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
  };
}

// Combine all state slices into the main AppState
type AppState = AuthSlice & UISlice;

// --- Store Implementation ---

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // --- Auth Slice ---
        isAuthenticated: false,
        user: null,
        token: null,
        authActions: {
          // Use renamed property
          login: (user, token) =>
            set({ isAuthenticated: true, user, token }, false, "auth/login"),
          logout: () =>
            set(
              { isAuthenticated: false, user: null, token: null },
              false,
              "auth/logout"
            ),
        },

        // --- UI Slice ---
        isSidebarOpen: false,
        uiActions: {
          // Use renamed property
          toggleSidebar: () =>
            set(
              (state) => ({ isSidebarOpen: !state.isSidebarOpen }),
              false,
              "ui/toggleSidebar"
            ),
          setSidebarOpen: (isOpen) =>
            set({ isSidebarOpen: isOpen }, false, "ui/setSidebarOpen"),
        },
      }),
      {
        name: "app-storage", // Name for localStorage key
        // Only persist parts of the state, e.g., auth token but not UI state
        partialize: (state) => ({
          token: state.token,
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

// --- Selectors ---
// It's often useful to create selectors for accessing specific parts of the state or actions

// Auth Selectors
export const useIsAuthenticated = () =>
  useAppStore((state) => state.isAuthenticated);
export const useCurrentUser = () => useAppStore((state) => state.user);
export const useAuthToken = () => useAppStore((state) => state.token);
export const useAuthActions = () => useAppStore((state) => state.authActions); // Use renamed property

// UI Selectors
export const useIsSidebarOpen = () =>
  useAppStore((state) => state.isSidebarOpen);
export const useUIActions = () => useAppStore((state) => state.uiActions); // Use renamed property

// Export the whole store hook if needed, but prefer selectors
export default useAppStore;
