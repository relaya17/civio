import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import heTranslations from "./locales/he.json";
import arTranslations from "./locales/ar.json";
import enTranslations from "./locales/en.json";
import ruTranslations from "./locales/ru.json";

const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("civio.language") || "he" : "he";

void i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "he",
  interpolation: { escapeValue: false },
  resources: {
    he: { translation: heTranslations },
    ar: { translation: arTranslations },
    en: { translation: enTranslations },
    ru: { translation: ruTranslations },
  },
});

// Save language preference
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("civio.language", lng);
  }
});

export { i18n };


