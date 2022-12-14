<template>
  <div
    class="bg-quote-color top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full md:max-w-[800px] fixed z-50 rounded-[10px] text-white backdrop-blur-xl max-h-[90%] overflow-y-scroll"
  >
    <header class="relative">
      <h4 class="text-[24px] text-center font-semibold my-8">
        {{ $t("movie_card.edit") }}
      </h4>
      <CloseIcon
        class="absolute top-0 right-5 cursor-pointer"
        @click="modalStore.modalType = null"
      />
      <div class="w-full h-[1px] bg-border-color"></div>
    </header>

    <section class="px-8 py-7">
      <div class="flex items-center">
        <ProfilePhoto class="w-[60px] h-[60px] rounded-full" />

        <h3 class="text-[24px] mb-1 ml-4">{{ username }}</h3>
      </div>

      <div>
        <input
          v-model="quote.name_en"
          type="text"
          class="w-full h-[48px] mt-4 my-2 rounded-[5px] bg-transparent focus:outline-none indent-4 text-[20px] border border-modal-text placeholder:text-white"
        />
        <input
          v-model="quote.name_ka"
          type="text"
          class="w-full h-[48px] mt-4 my-2 rounded-[5px] bg-transparent focus:outline-none indent-4 text-[20px] border border-modal-text placeholder:text-white"
        />

        <form @submit.prevent="editQuote">
          <div class="max-w-[900px] h-[500px] mt-5 rounded-[10px] relative">
            <label for="image" class="relative">
              <img
                class="w-full h-full flex items-center"
                :src="backendUrl + quoteStore.currentQuote?.image"
              />
            </label>
          </div>
          <input
            @change="uploadFile"
            name="image"
            type="file"
            class="mt-7 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-file-input file:text-white hover:file:opacity-90"
          />
        </form>

        <CommentSection
          :id="quoteStore?.currentQuote?.id"
          :user="quoteStore?.currentQuote?.user"
        />

        <RedButton
          :title="$t('movie_card.edit')"
          class="w-full h-[50px] mt-8"
          type="submit"
          @click="editQuote"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import RedButton from "@/components/ui/RedButton.vue";
import CommentSection from "@/components/comment/CommentSection.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";
import { useModalStore } from "@/stores/modal.js";
import { useUserStore } from "@/stores/user.js";
import { useQuoteStore } from "@/stores/quote.js";
import { reactive } from "vue";
import axios from "@/axios";
import router from "@/router/index";

const backendUrl = import.meta.env.VITE_IMAGES_URL;

const quoteStore = useQuoteStore();
const userStore = useUserStore();
const modalStore = useModalStore();
const username = userStore.userData.name;

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const quote = reactive({
  name_en: quoteStore?.currentQuote?.name?.en,
  name_ka: quoteStore?.currentQuote?.name?.ka,
  movie_id: quoteStore?.currentQuote?.movie_id,
  image: null,
});

function uploadFile(e) {
  quote.image = e.target.files[0];
  console.log(quote.image);
}

async function editQuote() {
  let data = new FormData();
  data.append("name_en", quote.name_en);
  data.append("name_ka", quote.name_ka);
  data.append("movie_id", quote.movie_id);
  data.append("image", quote.image);
  await axios
    .post(`/quotes/${quoteStore?.currentQuote?.id}`, data, config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  modalStore.modalType = null;
  router.push({ name: "feed" });
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
