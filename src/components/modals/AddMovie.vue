<template>
  <div
    class="bg-quote-color top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full md:max-w-[960px] fixed z-50 rounded-[10px] text-white backdrop-blur-xl"
  >
    <header class="relative">
      <h4 class="text-[24px] text-center font-semibold my-5">
        {{ $t("buttons.add_movie") }}
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

      <FormField
        id="form"
        name="form"
        @submit="addNewMovie"
        v-slot="{ meta, errors }"
      >
        <ProfileInput
          name="name_en"
          type="text"
          placeholder="Movie name"
          rules="required"
          :invalid="errors.name_en"
          v-model="movie.name_en"
        />
        <ProfileInput
          name="name_ka"
          type="text"
          placeholder="ფილმის სახელი"
          rules="required"
          :invalid="errors.name_ka"
          v-model="movie.name_ka"
        />

        <div class="flex items-center justify-between">
          <div class="w-[45%]">
            <ProfileInput
              name="year"
              type="number"
              :placeholder="$t('movies.year')"
              rules="required"
              :invalid="errors.year"
              class="mr-[10px]"
              v-model="movie.year"
            />
          </div>
          <div class="w-[45%]">
            <ProfileInput
              name="budget"
              type="number"
              :placeholder="$t('movies.budget')"
              rules="required"
              :invalid="errors.budget"
              v-model="movie.budget"
            />
          </div>
        </div>

        <ProfileInput
          name="director_en"
          type="text"
          placeholder="Director"
          rules="required"
          :invalid="errors.director_en"
          v-model="movie.director_en"
        />
        <ProfileInput
          name="director_ka"
          type="text"
          placeholder="რეჟისორი"
          rules="required"
          :invalid="errors.director_ka"
          v-model="movie.director_ka"
        />

        <VueMultiselect
          class="custom_class w-full h-[48px] mt-4 rounded bg-transparent border-none focus:outline-none text-[20px]"
          :placeholder="$t('movies.genres')"
          v-model="movie.genres"
          :options="options"
          :multiple="true"
          track-by="id"
          label="name"
          :searchable="false"
          :closeOnSelect="false"
        >
        </VueMultiselect>

        <BaseTextarea
          name="description_en"
          rules="required"
          placeholder="Movie description"
          v-model="movie.description_en"
          :invalid="errors.description_en"
        />

        <BaseTextarea
          name="description_ka"
          rules="required"
          placeholder="ფილმის აღწერა"
          v-model="movie.description_ka"
          :invalid="errors.description_ka"
        />

        <div
          class="flex items-center w-full h-[80px] mt-5 rounded-[5px] border border-modal-text p-2"
          @dragover.prevent
          @drop.prevent
          @drop="dragFile"
        >
          <div class="h-full flex items-center justify-center">
            <CameraIcon class="mx-3" />

            <div class="text-center text-sm md:text-[20px]">
              {{ $t("drag_drop") }}
            </div>
          </div>
          <input
            @change="uploadFile"
            name="image"
            type="file"
            class="ml-3 text-[1px] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-file-input file:text-white hover:file:opacity-90"
          />

          <div v-if="movie.image">
            <p class="ml-2">{{ $t("image") }}: {{ movie.image.name }}</p>
          </div>
        </div>

        <RedButton
          :title="$t('buttons.add_movie')"
          class="w-full h-[50px] mt-8"
          type="submit"
          @click="addNewMovie(meta)"
        />
      </FormField>
    </section>
  </div>
</template>

<script setup>
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";
import ProfileInput from "@/components/ui/ProfileInput.vue";
import BaseTextarea from "@/components/ui/BaseTextarea.vue";
import RedButton from "@/components/ui/RedButton.vue";
import { Form as FormField } from "vee-validate";
import { useModalStore } from "@/stores/modal.js";
import { useUserStore } from "@/stores/user.js";
import { ref, reactive, onMounted } from "vue";
import axios from "@/axios";
import VueMultiselect from "vue-multiselect";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const modalStore = useModalStore();
const userStore = useUserStore();

const username = userStore.userData.name;

const movie = reactive({
  name_en: null,
  name_ka: null,
  director_en: null,
  director_ka: null,
  description_en: null,
  description_ka: null,
  year: null,
  budget: null,
  genres: null,
  image: null,
});

function addNewMovie(meta) {
  if (meta.valid) {
    // get all genre id for backend pivot table
    let genreList = [];
    movie.genres.forEach((genre) => {
      genreList.push(genre.id);
    });
    let data = new FormData(form);
    data.append("genre", genreList);
    axios
      .post("/movies", data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    modalStore.modalType = null;
  }
  console.log(movie);
}

// Image upload
function uploadFile(e) {
  movie.image = e.target.files[0];
}

function dragFile(e) {
  movie.image = e.dataTransfer.files[0];
}

// Multiselect genre options
const options = ref([]);

onMounted(async () => {
  return await axios
    .get("/genres")
    .then((res) => (options.value = res.data.genres))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="css" scoped>
/* VueMultiselect custom styling */
.custom_class >>> .multiselect__tags {
  background: transparent;
}

.custom_class >>> .multiselect__tag {
  background: red;
  color: black;
}

.custom_class >>> .multiselect__content-wrapper {
  background: black;
  color: white;
}
</style>
