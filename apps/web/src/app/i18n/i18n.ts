import i18n from "i18next";
import { initReactI18next } from "react-i18next";

void i18n.use(initReactI18next).init({
  lng: "he",
  fallbackLng: "he",
  interpolation: { escapeValue: false },
  resources: {
    he: {
      translation: {
        appName: "מגדלור",
        slogan: "אור ומדריך בדרך לזכויות",
      },
    },
  },
});

export { i18n };


