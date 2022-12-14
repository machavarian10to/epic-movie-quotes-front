<template>
  <div
    class="border-notification-border border-[1px] rounded-[4px] py-4 px-6 mt-6 w-full"
  >
    <div class="flex items-center">
      <img :src="userPhoto" class="w-[60px] h-[60px] rounded-full" />

      <div class="ml-4">
        <h3 class="md:text-[24px] text-[20px]">{{ user.name }}</h3>

        <div class="flex items-center" v-if="action == 'comment'">
          <NotificationComment />
          <h5 class="text-[20px] px-3 text-input-bg mb-1 ml-4">
            Commented to your movie quote
          </h5>
        </div>

        <div class="flex items-center" v-if="action == 'like'">
          <NotificationLike />
          <h5 class="text-[20px] text-input-bg mb-1 ml-4">
            Reacted to your quote
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NotificationLike from "@/components/icons/NotificationLike.vue";
import NotificationComment from "@/components/icons/NotificationComment.vue";
import { computed } from "vue";
const props = defineProps(["id", "action", "user"]);

const userPhoto = computed(() => {
  let profilePhoto =
    "https://placehold.jp/30/fe3b1f/ffffff/200x200.png?text=Redberry";

  if (props.user.google_id) {
    profilePhoto = props.user.image;
  }

  if (!props.user.google_id && props.user.image) {
    const backendUrl = import.meta.env.VITE_IMAGES_URL;
    profilePhoto = backendUrl + props.user.image;
  }

  return profilePhoto;
});
</script>
