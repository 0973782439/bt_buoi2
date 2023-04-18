import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import VI from "./vi.json";
import EN from "./en.json";
export const resources = {
  en: { LANG: EN },
  vi: { LANG: VI },
} as const;
export const defaultNS = "LANG";
i18next.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  ns: ["LANG"],
  defaultNS,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});
