"use client";

import { useTranslation } from "react-i18next";

export function useTranslations() {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
  };

  return {
    t,
    i18n,
    changeLanguage,
  };
}
