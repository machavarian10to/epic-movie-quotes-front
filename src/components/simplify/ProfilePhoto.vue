<template>
  <img :src="userPhoto" />
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user.js";
const userStore = useUserStore();

const userPhoto = computed(() => {
  let profilePhoto =
    "https://placehold.jp/30/fe3b1f/ffffff/200x200.png?text=Redberry";

  if (userStore.userData.google_id) {
    profilePhoto = userStore.userData.image;
  }

  if (!userStore.userData.google_id && userStore.userData.image) {
    const backendUrl = import.meta.env.VITE_IMAGES_URL;
    profilePhoto = backendUrl + userStore.userData.image;
  }

  return profilePhoto;
});
</script>
