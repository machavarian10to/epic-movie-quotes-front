<template>
  <div
    class="bg-quote-color w-full md:max-w-[950px] mt-[24px] p-6 rounded-[12px] backdrop-blur-xl mb-[40px]"
  >
    <div class="flex items-center">
      <img class="w-[60px] h-[60px] rounded-full" :src="userPhoto" />

      <h3 class="text-[24px] mb-1 ml-[24px]">{{ user.name }}</h3>
    </div>
    <p class="text-[20px] my-[20px]">
      “{{ quote }}”. {{ $t("feed.movie") }} -
      <span class="text-movie-name">{{ movie }}</span> ({{ year }})
    </p>
    <div class="w-full md:max-w-[900px] h-[500px] rounded-[10px]">
      <img :src="quoteImage" class="w-full h-full" />
    </div>

    <CommentSection :id="id" :user="user" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import CommentSection from "@/components/comment/CommentSection.vue";

const props = defineProps([
  "id",
  "user",
  "quote",
  "movie",
  "year",
  "image",
  "amount",
]);

const backendUrl = import.meta.env.VITE_IMAGES_URL;

const userPhoto = computed(() => {
  let profilePhoto =
    "https://placehold.jp/30/fe3b1f/ffffff/200x200.png?text=Redberry";

  if (props.user.google_id) {
    profilePhoto = props.user.image;
  }

  if (props.user.image) {
    profilePhoto = backendUrl + props.user.image;
  }

  return profilePhoto;
});

const quoteImage = computed(() => {
  return backendUrl + props.image;
});
</script>
