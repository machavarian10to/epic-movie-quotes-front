<template>
  <div
    class="bg-quote-color top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full md:max-w-[800px] fixed z-50 rounded-[10px] text-white backdrop-blur-xl md:max-h-[90%] md:overflow-y-scroll"
  >
    <header class="relative">
      <h4 class="text-[24px] text-center font-semibold my-8">
        {{ $t("movie_card.edit_movie") }}
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
        @submit="editMovie"
        v-slot="{ meta, errors }"
      >
        <ProfileInput
          name="name_en"
          type="text"
          placeholder="Movie name"
          rules="required"
          :invalid="errors.name_en"
          v-model="editedMovie.name_en"
          :value="editedMovie.name_en"
        />

        <ProfileInput
          name="name_ka"
          type="text"
          placeholder="ფილმის სახელი"
          rules="required"
          :invalid="errors.name_ka"
          v-model="editedMovie.name_ka"
          :value="editedMovie.name_ka"
        />

        <div class="flex items-center justify-between">
          <div class="w-[45%]">
            <ProfileInput
              name="year"
              type="number"
              placeholder="Year"
              :invalid="errors.year"
              class="mr-[10px]"
              v-model="editedMovie.year"
              :value="editedMovie.year"
            />
          </div>

          <div class="w-[45%]">
            <ProfileInput
              name="budget"
              type="number"
              placeholder="Budget"
              :invalid="errors.budget"
              v-model="editedMovie.budget"
              :value="editedMovie.budget"
            />
          </div>
        </div>

        <ProfileInput
          name="director_en"
          type="text"
          placeholder="Director"
          rules="required"
          :invalid="errors.director_en"
          v-model="editedMovie.director_en"
          :value="editedMovie.director_en"
        />

        <ProfileInput
          name="director_ka"
          type="text"
          placeholder="რეჟისორი"
          rules="required"
          :invalid="errors.director_ka"
          v-model="editedMovie.director_ka"
          :value="editedMovie.director_ka"
        />

        <VueMultiselect
          class="custom_class w-full h-[48px] mt-4 rounded bg-transparent border-none focus:outline-none text-[20px]"
          placeholder="Genres"
          v-model="editedMovie.genres"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          track-by="id"
          label="name"
          :searchable="false"
        >
        </VueMultiselect>

        <BaseTextarea
          name="description_en"
          rules="required"
          placeholder="Movie description"
          v-model="editedMovie.description_en"
          :value="editedMovie.description_en"
          :invalid="errors.description_en"
        />

        <BaseTextarea
          name="description_ka"
          rules="required"
          placeholder="ფილმის აღწერა"
          v-model="editedMovie.description_ka"
          :value="editedMovie.description_ka"
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

            <div class="text-center text-base md:text-[20px]">
              {{ $t("drag_drop") }}
            </div>
          </div>
          <input
            @change="uploadFile"
            name="image"
            type="file"
            class="ml-3 text-[1px] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-file-input file:text-white hover:file:opacity-90"
          />

          <div v-if="editedMovie.image">
            <p class="ml-2">{{ $t("image") }}: {{ editedMovie.image.name }}</p>
          </div>
        </div>

        <RedButton
          :title="$t('movie_card.edit_movie')"
          class="w-full h-[50px] mt-8"
          type="submit"
          @click="editMovie(meta)"
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
import { useRoute } from "vue-router";
import { Form as FormField } from "vee-validate";
import { useModalStore } from "@/stores/modal.js";
import { useUserStore } from "@/stores/user.js";
import { useMovieStore } from "@/stores/movie.js";
import { ref, reactive, onMounted } from "vue";
import axios from "@/axios";
import VueMultiselect from "vue-multiselect";
import router from "@/router/index";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const modalStore = useModalStore();
const userStore = useUserStore();
const movieStore = useMovieStore();
const route = useRoute();

const username = userStore.userData.name;

const editedMovie = reactive({
  name_en: movieStore.currentMovie?.name?.en,
  name_ka: movieStore.currentMovie?.name?.ka,
  director_en: movieStore.currentMovie?.director?.en,
  director_ka: movieStore.currentMovie?.director?.ka,
  description_en: movieStore.currentMovie?.description?.en,
  description_ka: movieStore.currentMovie?.description?.ka,
  year: movieStore.currentMovie?.year,
  budget: movieStore.currentMovie?.budget,
  genres: movieStore.currentMovie.genres,
  image: null,
});

async function editMovie(meta) {
  if (meta.valid) {
    // get all genre id for backend pivot table
    let genreList = [];
    editedMovie.genres.forEach((genre) => {
      genreList.push(genre.id);
    });

    let data = new FormData(form);
    data.append("genre", genreList);
    await axios
      .post(`/movies/${route.params.movie}`, data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    router.push({ name: "movies" });
    modalStore.modalType = null;
  }
}

// Image upload
function uploadFile(e) {
  editedMovie.image = e.target.files[0];
}

function dragFile(e) {
  editedMovie.image = e.dataTransfer.files[0];
}

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
