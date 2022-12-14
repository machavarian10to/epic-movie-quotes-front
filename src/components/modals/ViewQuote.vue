<template>
  <div
    class="bg-quote-color top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full md:max-w-[800px] fixed z-50 rounded-[10px] text-white backdrop-blur-xl md:max-h-[90%] md:overflow-y-scroll"
  >
    <header class="relative">
      <h4 class="text-[24px] text-center font-semibold my-8">
        {{ $t("movie_card.view") }}
      </h4>
      <CloseIcon
        class="absolute top-0 right-5 cursor-pointer"
        @click="modalStore.modalType = null"
      />
      <div class="w-full h-[1px] bg-border-color"></div>
    </header>

    <section class="px-4 py-4">
      <div class="flex items-center">
        <ProfilePhoto class="w-[60px] h-[60px] rounded-full" />

        <h3 class="text-[24px] mb-1 ml-4">{{ username }}</h3>
      </div>

      <div>
        <input
          disabled
          :value="quoteStore.currentQuote?.name?.en"
          type="text"
          class="w-full h-[48px] mt-4 my-2 rounded-[5px] bg-transparent focus:outline-none indent-4 text-[20px] border border-modal-text placeholder:text-white"
        />
        <input
          disabled
          :value="quoteStore.currentQuote?.name?.ka"
          type="text"
          class="w-full h-[48px] mt-4 my-2 rounded-[5px] bg-transparent focus:outline-none indent-4 text-[20px] border border-modal-text placeholder:text-white"
        />

        <div class="max-w-[900px] h-[500px] mt-5 rounded-[10px]">
          <img
            class="w-full h-full"
            :src="backendUrl + quoteStore.currentQuote?.image"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import CloseIcon from "@/components/icons/CloseIcon.vue";
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";
import { useModalStore } from "@/stores/modal.js";
import { useUserStore } from "@/stores/user.js";
import { useQuoteStore } from "@/stores/quote.js";

const backendUrl = import.meta.env.VITE_IMAGES_URL;

const quoteStore = useQuoteStore();
const userStore = useUserStore();
const modalStore = useModalStore();
const username = userStore.userData.name;
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
