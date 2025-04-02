"use client";

// Note: The i18next instance is now primarily managed by next-i18next
// based on your next-i18next.config.js and next.config.ts.
// This component might be simplified or removed depending on specific needs,
// but we remove the manual initialization here to avoid conflicts.

// You might still need I18nextProvider if you have complex client-side
// initialization needs, but often next-i18next handles it.
// For now, we assume next-i18next provides the context.

// If you directly need the 'i18n' instance on the client for specific cases,
// you can import it, but avoid re-initializing.
// import i18n from 'i18next';

import type { ReactNode } from "react";

// This component currently acts as a simple wrapper.
// If translations work without it in layout.tsx, it could potentially be removed.
export function I18nProvider({ children }: { children: ReactNode }) {
  // The actual I18nextProvider might be implicitly handled by next-i18next
  // when using serverSideTranslations or similar mechanisms.
  // If client-side only components need explicit provider context not handled
  // automatically, you might need to import and use I18nextProvider here
  // with the i18n instance managed by next-i18next.
  // Example (if needed):
  // import { I18nextProvider } from 'react-i18next';
  // import i18n from 'i18next'; // Ensure this instance is configured by next-i18next
  // return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;

  // For now, just return children, assuming context is provided higher up or implicitly.
  return <>{children}</>;
}
