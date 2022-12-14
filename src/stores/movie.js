import { defineStore } from "pinia";

export const useMovieStore = defineStore({
  id: "movie",
  state: () => ({
    currentMovie: null,
  }),
});
