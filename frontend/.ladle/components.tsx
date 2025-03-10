import React from "react";
import { useStore } from "@/lib/store";

type GlobalProviderProps = {
  children: React.ReactNode;
};

/**
 * GlobalProvider component to provide global context to Ladle stories.
 * This component wraps the children with necessary context providers.
 */
function GlobalProvider({ children }: GlobalProviderProps) {
  const { theme } = useStore();

  return (
    <div className={theme}>
      {children}
    </div>
  );
}

export default GlobalProvider;
