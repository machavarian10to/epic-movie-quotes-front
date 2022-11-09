<template>
  <form @submit.prevent="logout">
    <RedButton title="Logout" @click="logout" class="w-[360px] h-[40px] my-5" />
  </form>
</template>

<script setup>
import RedButton from "@/components/ui/RedButton.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const router = useRouter();
const userStore = useUserStore();

function logout() {
  userStore.logout().then(() => {
    router.push({ name: "home" });
  });
}
</script>
=
