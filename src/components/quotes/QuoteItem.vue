<template>
  <div
    class="max-w-[800px] h-[260px] p-6 bg-quote-color mt-16 backdrop-blur-xl relative"
  >
    <div
      class="w-10 h-10 absolute top-7 right-4 cursor-pointer text-center"
      @click="toggleButton"
    >
      <DotsIcon />
    </div>

    <div
      v-if="showEdit"
      class="py-8 px-10 max-w-[230px] absolute top-20 right-2 bg-user-header rounded-[10px]"
    >
      <div
        class="flex items-center cursor-pointer hover:opacity-90"
        @click="modalStore.modalType = 'view-quote'"
      >
        <EyeIcon />
        <span class="capitalize ml-4">{{ $t("movie_card.view_quote") }}</span>
      </div>
      <div
        class="flex items-center cursor-pointer my-8 hover:opacity-90"
        @click="modalStore.modalType = 'edit-quote'"
      >
        <PencilIcon />
        <span class="capitalize ml-4">{{ $t("movie_card.edit_quote") }}</span>
      </div>
      <div
        class="flex items-center cursor-pointer hover:opacity-90"
        @click="deleteQuote"
      >
        <TrashIcon />
        <span class="capitalize ml-4">{{ $t("movie_card.delete_quote") }}</span>
      </div>
    </div>

    <div class="flex items-center justify-around" @click="toggleButton">
      <div class="w-[225px] h-[140px]">
        <img :src="img" class="w-full h-full rounded-sm" />
      </div>

      <p class="text-input-bg text-[24px] italic w-[470px] mx-3">
        "{{ name?.[locale] }}"
      </p>
    </div>

    <!-- divider -->
    <div class="w-full border border-border-color mt-6"></div>

    <div class="flex items-center my-[24px] gap-3">
      <span class="text-[20px]">{{ amount }}</span>
      <CommentIcon />

      <span class="text-[20px] ml-[24px]">{{ totalLikes }}</span>
      <LikeIcon color="white" />
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="modalStore.modalType"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <div
        @click="modalStore.modalType = null"
        class="fixed inset-0 z-10 h-[100vh] w-full text-black-rgba backdrop-blur-[3px]"
      ></div>

      <keep-alive>
        <component :is="modalStore.modalType"></component>
      </keep-alive>
    </div>
  </Teleport>
</template>

<script setup>
import CommentIcon from "@/components/icons/CommentIcon.vue";
import LikeIcon from "@/components/icons/LikeIcon.vue";
import DotsIcon from "@/components/icons/DotsIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import router from "@/router/index";
import axios from "@/axios";
import { ref, onMounted } from "vue";
import { useModalStore } from "@/stores/modal.js";
import { useQuoteStore } from "@/stores/quote.js";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => i18n.global.locale);

const quoteStore = useQuoteStore();
const modalStore = useModalStore();

const props = defineProps(["id", "name", "movie", "image", "amount"]);

const backendUrl = import.meta.env.VITE_IMAGES_URL;

const img = backendUrl + props.image;

const showEdit = ref(false);

const totalLikes = ref(null);

async function toggleButton() {
  showEdit.value = !showEdit.value;
  await axios
    .get(`/quotes/${props.id}`)
    .then((res) => (quoteStore.currentQuote = res.data.quote))
    .catch((err) => console.log(err));
}

async function deleteQuote() {
  await axios
    .delete(`/quotes/${props.id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  router.push({ name: "movies" });
}

onMounted(async () => {
  await axios
    .get(`/get-likes/${props.id}`)
    .then((res) => (totalLikes.value = res.data.like))
    .catch((err) => console.log(err));
});
</script>
