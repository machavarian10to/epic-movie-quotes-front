<template>
  <header class="bg-user-header fixed w-full top-0 z-20">
    <div class="flex justify-between items-center p-5">
      <h3 class="hidden md:block uppercase font-bold text-golden ml-10">
        movie quotes
      </h3>
      <BurgerBar
        class="md:hidden cursor-pointer"
        @click="responsiveStore.showMobileNavbar = true"
      />

      <div class="flex items-center m-0 md:mr-12 cursor-pointer">
        <SearchIcon
          class="block md:hidden mx-7"
          @click="responsiveStore.showMobileSearch = true"
        />

        <div class="relative text-white" @click="toggleNotification">
          <NotificationBell />
          <div
            class="bg-red-500 w-[25px] h-[25px] rounded-[50%] text-center absolute top-[-10px] right-[-10px]"
          >
            <span class="">{{ notifications.length }}</span>
          </div>
        </div>

        <div
          v-if="showNotifications"
          class="absolute text-white top-20 md:top-24 right-0 md:right-[5%] w-[100%] md:max-w-[960px] max-h-[700px] px-8 py-10 bg-black backdrop-blur-xl rounded-[12px] overflow-y-scroll"
        >
          <h3 class="text-3xl font-semibold px-5">Notifications</h3>

          <NotificationCard
            v-for="notification in notifications"
            :key="notification.id"
            :id="notification.id"
            :action="notification.type"
            :user="notification.from"
          />
        </div>

        <LocaleChanger class="mx-10 hidden md:block" />

        <form @submit.prevent="logout">
          <BlackButton
            :title="$t('buttons.logout')"
            @click="logout"
            class="px-5 h-[40px] hidden md:block"
          />
        </form>
      </div>
    </div>
  </header>

  <div
    v-if="responsiveStore.showMobileNavbar"
    class="w-[90%] absolute z-40 top-0 h-[90%] bg-mobile-search"
  >
    <CloseIcon
      class="cursor-pointer m-3"
      @click="responsiveStore.showMobileNavbar = false"
    />

    <MobileNavMenu />
  </div>
</template>

<script setup>
import LocaleChanger from "@/components/simplify/LocaleChanger.vue";
import BlackButton from "@/components/ui/BlackButton.vue";
import NotificationCard from "@/components/notifications/NotificationCard.vue";
import NotificationBell from "@/components/icons/NotificationBell.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import MobileNavMenu from "@/components/ui/MobileNavMenu.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { useResponsiveStore } from "@/stores/responsive.js";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { ref, onUnmounted } from "vue";
import BurgerBar from "@/components/icons/BurgerBar.vue";

const router = useRouter();
const userStore = useUserStore();
const responsiveStore = useResponsiveStore();

const showNotifications = ref(false);

function toggleNotification() {
  showNotifications.value = !showNotifications.value;
}

const notifications = ref(userStore.userData.notifications);

window.Echo.private("notification-channel." + userStore.userData.id).listen(
  ".new-notification",
  (e) => {
    notifications.value.push(e.notification);
  }
);

onUnmounted(() => {
  window.Echo.private(
    "notification-channel." + userStore.userData.id
  ).stopListening(".new-notification");
});

function logout() {
  userStore.logout();
  router.push({ name: "home" });
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
