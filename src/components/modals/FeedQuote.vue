<template>
  <div
    class="bg-quote-color top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full md:max-w-[960px] fixed z-50 rounded-[10px] text-white backdrop-blur-xl"
  >
    <header class="relative">
      <h4 class="text-[20px] md:text-[24px] text-center font-semibold my-8">
        {{ $t("feed.feed_quote") }}
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

            <div class="text-center text-[14px] md:text-[20px]">
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

        <VueMultiselect
          class="custom_class w-full h-[48px] my-5 rounded bg-transparent border-none focus:outline-none text-[20px]"
          :placeholder="$t('feed.choose_movie_placeholder')"
          v-model="quote.movie_id"
          :options="movies"
          track-by="id"
          label="name"
          :searchable="false"
        >
        </VueMultiselect>

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
import { useRouter } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import VueMultiselect from "vue-multiselect";
import axios from "@/axios";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const movies = ref([]);

const modalStore = useModalStore();
const userStore = useUserStore();

const username = userStore.userData.name;

const router = useRouter();

const quote = reactive({
  name_en: null,
  name_ka: null,
  image: null,
  movie_id: null,
});

function addQuote(meta) {
  if (meta.valid) {
    let data = new FormData();
    data.append("name_en", quote.name_en);
    data.append("name_ka", quote.name_ka);
    data.append("image", quote.image);
    data.append("movie_id", quote.movie_id.id);
    axios
      .post("/quotes", data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    modalStore.modalType = null;
    router.push({ name: "movies" });
  }
}

onMounted(async () => {
  await axios
    .get("/movies")
    .then((res) => {
      let movieList = [];
      res.data.movies.forEach((elem) => {
        movieList.push({ id: elem.id, name: elem.name.en });
      });
      movies.value = movieList;
    })
    .catch((err) => console.log(err));
});

// Image upload
function uploadFile(e) {
  quote.image = e.target.files[0];
}

function dragFile(e) {
  quote.image = e.dataTransfer.files[0];
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="css" scoped>
/* VueMultiselect custom styling */
.custom_class >>> .multiselect__tags {
  background: transparent;
  height: 70px;
}

.custom_class >>> .multiselect__tag {
  background: red;
  color: black;
}

.custom_class >>> .multiselect__content-wrapper {
  background: black;
  color: white;
}
.custom_class >>> .multiselect__select {
  margin-top: 15px;
}
.custom_class >>> .multiselect__single {
  background: black;
  color: white;
  font-size: 20px;
  margin-top: 12px;
  text-indent: 10px;
}
.custom_class >>> .multiselect__placeholder {
  font-size: 20px;
  margin-top: 8px;
  text-indent: 10px;
}
</style>
