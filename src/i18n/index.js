import { createI18n } from "vue-i18n";

import en from "./en/index.js";
import ka from "./ka/index.js";

const messages = {
  en,
  ka,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "ka",
  messages,
});

export default i18n;
