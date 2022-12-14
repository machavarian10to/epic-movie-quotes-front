<template>
  <router-link
    :to="{ name: 'movie', params: { movie: id } }"
    class="flex flex-col items-center"
  >
    <div class="max-w-[400px] h-[470px] text-white cursor-pointer">
      <div class="w-full h-[370px]">
        <img :src="img" class="rounded-[12px] w-full h-full" />
      </div>
      <h3 class="text-[24px] my-4 font-semibold uppercase">
        {{ name[locale] }} ({{ year }})
      </h3>
      <div class="flex text-[24px] font-semibold">
        <span>{{ amount }}</span>
        <QuoteIcon class="ml-3" />
      </div>
    </div>
  </router-link>
</template>

<script setup>
import QuoteIcon from "@/components/icons/QuoteIcon.vue";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => i18n.global.locale);

const props = defineProps(["id", "name", "year", "image", "amount"]);
const backendUrl = import.meta.env.VITE_IMAGES_URL;

const img = backendUrl + props.image;
</script>
