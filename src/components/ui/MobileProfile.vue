<template>
  <div
    class="md:hidden block w-full h-[80%] bg-user-header py-10 px-6 mt-32 text-white"
  >
    <MobileUserEdit v-if="responsiveStore.showUserEdit" />

    <div
      v-if="!responsiveStore.showUserEdit"
      class="flex flex-col items-center justify-center"
    >
      <ProfilePhoto class="rounded-full w-[188px] h-[188px]" />

      <div class="mt-10">
        <label class="text-white font-medium my-2">{{
          $t("inputs.username")
        }}</label>

        <div class="flex items-center">
          <input
            v-model="name"
            disabled
            class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-transparent border-b-[1px] text-[20px] indent-4 disabled:opacity-80"
          />

          <span
            @click="responsiveStore.showUserEdit = 'username'"
            v-if="!googleId"
            class="ml-[35px] text-[20px] cursor-pointer text-gray-300"
          >
            {{ $t("profile.edit") }}
          </span>
        </div>
      </div>

      <div class="mt-10">
        <label class="text-white font-medium my-2">{{
          $t("inputs.password")
        }}</label>

        <div class="flex items-center">
          <input
            disabled
            type="text"
            class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-transparent border-b-[1px] text-[20px] indent-4 disabled:opacity-80"
            placeholder="********"
          />

          <span
            v-if="!googleId"
            @click="responsiveStore.showUserEdit = 'password'"
            class="ml-[35px] text-[20px] cursor-pointer text-gray-300"
          >
            {{ $t("profile.edit") }}
          </span>
        </div>
      </div>

      <div
        @click="responsiveStore.showUserEdit = 'emails'"
        class="flex justify-between items-center w-full px-5 mt-10 cursor-pointer"
      >
        <label class="text-white font-medium my-2">{{
          $t("inputs.email")
        }}</label>

        <span>></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";
import MobileUserEdit from "@/components/responsive/MobileUserEdit.vue";
import { useUserStore } from "@/stores/user.js";
import { useResponsiveStore } from "@/stores/responsive.js";

const userStore = useUserStore();
const responsiveStore = useResponsiveStore();

const googleId = userStore.userData.google_id;

const name = userStore.userData.name;
</script>
