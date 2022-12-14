<template>
  <UserHeader />

  <NavMenu />

  <section>
    <div class="md:ml-[350px]">
      <div class="flex flex-col justify-between text-white mt-32">
        <h3 class="text-[24px] hidden md:block">
          {{ $t("movie_card.movie_description") }}
        </h3>

        <div class="mt-8">
          <div class="flex flex-col md:flex-row">
            <div class="max-w-[800px] h-[440px] backdrop-blur-xl mx-3">
              <img
                class="w-full h-full rounded-xl"
                :src="backendUrl + movie.image"
              />
            </div>

            <div class="mx-8 max-w-[800px] max-h-[440px]">
              <div
                class="mt-6 md:mt-0 flex flex-row justify-between items-center"
              >
                <h4 class="text-[24px] text-movie-name uppercase">
                  {{ movieStore.currentMovie?.name?.[locale] }}
                  ({{ movie.year }})
                </h4>

                <div
                  class="ml-12 flex items-center justify-center bg-user-header rounded-[10px] w-[144px] h-[40px]"
                >
                  <PencilIcon
                    class="cursor-pointer hover:opacity-80"
                    @click="modalStore.modalType = 'edit-movie'"
                  />

                  <div class="w-[1px] mx-5 h-5 bg-modal-text"></div>

                  <TrashIcon
                    class="cursor-pointer hover:opacity-80"
                    @click="deleteMovie"
                  />
                </div>
              </div>

              <div class="flex mt-6">
                <div
                  v-for="genre in movie.genres"
                  class="p-3 bg-modal-text mr-5 rounded font-semibold"
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
                <h4 class="my-5">
                  {{ $t("movie_card.budget") }}:
                  <span class="text-white">{{ movie.budget }}$</span>
                </h4>

                <p class="leading-8">
                  {{ movie.description?.[locale] }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex mt-10 items-center mx-2">
          <h4 class="text-[24px]">
            {{ $t("movie_card.quotes") }} ({{ $t("movies.total") }}
            {{ movie.quotes?.length }})
          </h4>
          <RedButton
            @click="modalStore.modalType = 'add-quote'"
            :title="$t('buttons.add_quote')"
            class="flex items-center flex-row-reverse justify-center gap-3 px-5 h-[50px] mx-5 text-[20px]"
          >
            <PlusIcon />
          </RedButton>
        </div>

        <div class="mb-8">
          <QuoteItem
            v-for="quote in movie.quotes"
            :key="quote.id"
            :id="quote.id"
            :name="quote.name"
            :movie="quote.movie_id"
            :image="quote.image"
            :amount="quote.comments.length"
          />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="modalStore.modalType">
        <div
          @click="modalStore.modalType = null"
          class="fixed inset-0 z-10 h-[100vh] w-full text-black-rgba backdrop-blur-[3px]"
        ></div>

        <keep-alive>
          <component :is="modalStore.modalType"></component>
        </keep-alive>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import UserHeader from "@/components/layout/UserHeader.vue";
import NavMenu from "@/components/ui/NavMenu.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import RedButton from "@/components/ui/RedButton.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import QuoteItem from "@/components/quotes/QuoteItem.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "@/axios";
import { useModalStore } from "@/stores/modal.js";
import { useMovieStore } from "@/stores/movie.js";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => i18n.global.locale);

const modalStore = useModalStore();
const movieStore = useMovieStore();

const route = useRoute();
const router = useRouter();

const movie = ref([]);

const backendUrl = import.meta.env.VITE_IMAGES_URL;

onMounted(async () => {
  await axios
    .get(`/movies/${route.params.movie}`)
    .then(
      (res) =>
        (movie.value = res.data.movie) &&
        (movieStore.currentMovie = res.data.movie)
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

async function deleteMovie() {
  await axios
    .delete(`/movies/${route.params.movie}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  router.push({ name: "movies" });
}
</script>
