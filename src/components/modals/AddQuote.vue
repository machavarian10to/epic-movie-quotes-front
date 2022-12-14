<template>
  <div
    class="bg-quote-color top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full md:max-w-[900px] fixed z-50 rounded-[10px] text-white backdrop-blur-xl"
  >
    <header class="relative">
      <h4 class="text-[24px] text-center font-semibold my-8">
        {{ $t("buttons.add_quote") }}
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

      <div class="flex my-5">
        <div class="w-[300px] h-[160px] backdrop-blur-xl">
          <img
            class="w-full h-full rounded-xl"
            :src="backendUrl + movie.image"
          />
        </div>

        <div class="mx-6">
          <div>
            <h4 class="text-[24px] text-movie-name uppercase">
              {{ movie?.name?.[locale] }} ({{ movie.year }})
            </h4>
          </div>

          <div class="flex mt-3">
            <div
              v-for="genre in movie.genres"
              class="p-2 bg-modal-text mr-5 rounded font-semibold"
              :key="genre.id"
            >
              {{ genre.name }}
            </div>
          </div>

          <div class="mt-6 ml-3 text-[18px] text-input-bg">
            <h4 class="mt-5">
              {{ $t("movie_card.director") }}:
              <span class="text-white">{{ movie.director?.[locale] }}</span>
            </h4>
          </div>
        </div>
      </div>

      <FormField @submit="addQuote" v-slot="{ meta, errors }">
        <BaseTextarea
          name="quote_desc_en"
          rules="required"
          placeholder="Quote in english"
          v-model="quote.name_en"
          :invalid="errors.quote_desc_en"
        />

        <BaseTextarea
          name="quote_desc_ka"
          rules="required"
          placeholder="ციტატა ქართულ ენაზე"
          v-model="quote.name_ka"
          :invalid="errors.quote_desc_ka"
        />

        <div
          class="flex items-center w-full h-[80px] mt-5 rounded-[5px] border border-modal-text p-2"
          @dragover.prevent
          @drop.prevent
          @drop="dragFile"
        >
          <div class="h-full flex items-center justify-center">
            <CameraIcon class="mx-3" />

            <div class="text-center text-[20px]">
              {{ $t("drag_drop") }}
            </div>
          </div>
          <input
            @change="uploadFile"
            name="image"
            type="file"
            class="ml-3 text-[1px] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-file-input file:text-white hover:file:opacity-90"
          />

          <div v-if="quote.image">
            <p class="ml-2">{{ $t("image") }}: {{ quote.image.name }}</p>
          </div>
        </div>

        <RedButton
          :title="$t('buttons.add_quote')"
          class="w-full h-[50px] mt-8"
          type="submit"
          @click="addQuote(meta)"
        />
      </FormField>
    </section>
  </div>
</template>

<script setup>
import CameraIcon from "@/components/icons/CameraIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";
import BaseTextarea from "@/components/ui/BaseTextarea.vue";
import RedButton from "@/components/ui/RedButton.vue";
import { Form as FormField } from "vee-validate";
import { useModalStore } from "@/stores/modal.js";
import { useUserStore } from "@/stores/user.js";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, onMounted, computed } from "vue";
import axios from "@/axios";
import i18n from "@/i18n/index.js";

const locale = computed(() => i18n.global.locale);

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const modalStore = useModalStore();
const userStore = useUserStore();

const username = userStore.userData.name;

const route = useRoute();
const router = useRouter();

const movie = ref([]);

const backendUrl = import.meta.env.VITE_IMAGES_URL;

onMounted(async () => {
  return await axios
    .get(`/movies/${route.params.movie}`)
    .then((res) => (movie.value = res.data.movie))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

const quote = reactive({
  name_en: null,
  name_ka: null,
  image: null,
  movie_id: route.params.movie,
});

function addQuote(meta) {
  if (meta.valid) {
    console.log(quote);
    let data = new FormData();
    data.append("name_en", quote.name_en);
    data.append("name_ka", quote.name_ka);
    data.append("image", quote.image);
    data.append("movie_id", quote.movie_id);
    axios
      .post("/quotes", data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    modalStore.modalType = null;
    router.push({ name: "feed" });
  }
}

// Image upload
function uploadFile(e) {
  quote.image = e.target.files[0];
}

function dragFile(e) {
  quote.image = e.dataTransfer.files[0];
}
</script>
