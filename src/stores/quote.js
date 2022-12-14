import { defineStore } from "pinia";

export const useQuoteStore = defineStore({
  id: "quote",
  state: () => ({
    currentQuote: null,
  }),
});
