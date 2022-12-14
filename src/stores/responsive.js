import { defineStore } from "pinia";

export const useResponsiveStore = defineStore({
  id: "responsive",
  state: () => ({
    showMobileSearch: false,
    showMobileNavbar: false,
    showMobileProfile: false,
    showUserEdit: false,
  }),
});
