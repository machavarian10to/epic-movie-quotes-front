<template>
  <UserHeader />

  <NavMenu />
  <section>
    <div class="md:ml-[350px]">
      <div class="flex items-center justify-between text-white mt-32 mx-8">
        <h3 class="text-[24px] mr-3">
          {{ $t("movies.movie_list") }} ({{ $t("movies.total") }}
          {{ movieList.length }})
        </h3>
        <div class="flex items-center justify-center">
          <form @submit.prevent="search" class="hidden md:block">
            <div class="relative">
              <div
                class="flex absolute top-1 left-0 items-center pointer-events-none"
              >
                <SearchIcon />
              </div>

              <input
                v-model="keyword"
                type="text"
                id="search"
                name="search"
                class="h-[30px] indent-8 w-[100px] bg-transparent focus:outline-none placeholder:text-[20px] text-[20px]"
                :placeholder="$t('movies.search')"
              />
            </div>
          </form>

          <RedButton
            :title="$t('buttons.add_movie')"
            @click="modalStore.modalType = 'add-movie'"
            class="flex items-center flex-row-reverse justify-center gap-3 px-5 h-[50px] mx-5 text-base md:text-[20px]"
          >
            <PlusIcon />
          </RedButton>
        </div>
      </div>

      <div v-if="movieList.length === 0" class="mt-32">
        <h3 class="text-5xl text-red-600 font-bold text-center">
          You don't have any movies.
        </h3>
      </div>

      <div
        class="my-[70px] mx-3 grid grid-col-1 gap-x-10 gap-y-10 md:grid-cols-3"
      >
        <MovieCard
          v-for="movie in movieList"
          :key="movie.id"
          :id="movie.id"
          :name="movie.name"
          :image="movie.image"
          :year="movie.year"
          :amount="movie.quotes.length"
        />
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
  </section>
</template>

<script setup>
import SearchIcon from "@/components/icons/SearchIcon.vue";
import UserHeader from "@/components/layout/UserHeader.vue";
import NavMenu from "@/components/ui/NavMenu.vue";
import RedButton from "@/components/ui/RedButton.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MovieCard from "@/components/movies/MovieCard.vue";
import { ref, onMounted } from "vue";
import { useModalStore } from "@/stores/modal.js";
import axios from "@/axios";

const modalStore = useModalStore();
const keyword = ref(null);

const movieList = ref([]);

onMounted(async () => {
  return await axios
    .get("/movies")
    .then((res) => (movieList.value = res.data.movies))
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

async function search() {
  return await axios
    .post("/search-movies", { keyword: keyword.value })
    .then((res) => (movieList.value = res.data.movies))
    .catch((err) => console.log(err));
}
</script>
