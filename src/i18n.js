/* eslint-disable @typescript-eslint/camelcase */

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en_US: {
    translation: {
      play: "Play Battle Chess",
      icons_info: "Icons made by",
      icons_from: "from",
      team_won: "Team {{team}} won",
      team_0: "Black",
      team_1: "White",
      round: "Round",
      team: "Team",
      out_of_reach: "{{name}} is out of reach.",
      killed: "{{name}} got killed.",
      no_moves: "{{name}}'s got no moves left."
    }
  },
  pl_PL: {
    translation: {
      play: "Zagraj w Battle Chess",
      icons_info: "Ikony stworzone przez",
      icons_from: "pobrane z",
      team_won: "{{team}} zwyciężyli",
      team_0: "Biali",
      team_1: "Czarni",
      round: "Runda",
      team: "Drużyna",
      out_of_reach: "{{name}} jest poza zasięgiem.",
      killed: "Zabito {{name}}.",
      no_moves: "{{name}} nie ma więcej ruchów."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain"
      ]
    },
    fallbackLng: "en_US",

    keySeparator: true,

    interpolation: {
      escapeValue: false
    }
  });
export default i18n;
