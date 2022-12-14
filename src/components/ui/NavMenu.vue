<template>
  <section class="hidden md:block">
    <div class="fixed ml-[40px] text-white">
      <router-link
        :to="{ name: 'profile' }"
        custom
        v-slot="{ href, navigate, isExactActive }"
      >
        <div class="flex items-center">
          <ProfilePhoto
            :class="{
              'border-[2px] border-button-basic': isExactActive,
            }"
            class="w-[60px] h-[60px] rounded-full"
          />

          <div class="ml-[24px]">
            <h3 class="text-[24px] mb-1">{{ username }}</h3>
            <p
              class="text-input-bg cursor-pointer"
              :href="href"
              @click="navigate"
            >
              {{ $t("nav_menu.edit_profile") }}
            </p>
          </div>
        </div>
      </router-link>

      <div class="flex flex-col">
        <router-link
          :to="{ name: 'feed' }"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <div class="flex my-10">
            <HomeIcon :active="isExactActive" />
            <p
              class="text-[24px] ml-10 cursor-pointer"
              :href="href"
              @click="navigate"
            >
              {{ $t("nav_menu.feed") }}
            </p>
          </div>
        </router-link>

        <router-link
          :to="{ name: 'movies' }"
          custom
          v-slot="{ href, navigate, isExactActive }"
        >
          <div class="flex">
            <MovieIcon :active="isExactActive" />
            <p
              class="text-[24px] ml-10 cursor-pointer"
              :href="href"
              @click="navigate"
            >
              {{ $t("nav_menu.movies") }}
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import HomeIcon from "@/components/icons/HomeIcon.vue";
import MovieIcon from "@/components/icons/MovieIcon.vue";
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";

import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const username = userStore.userData.name;
</script>
