<template>
  <UserHeader />

  <NavMenu />

  <section>
    <div class="md:ml-[300px]">
      <div class="flex justify-center items-center flex-col text-white mt-32">
        <div class="flex items-center justify-center flex-wrap max-w-[900p]">
          <div
            @click="modalStore.modalType = 'feed-quote'"
            class="flex p-5 h-[50px] bg-transparent md:bg-user-header items-center justify-center rounded-[10px] gap-4 cursor-pointer hover:opacity-90"
          >
            <PenIcon />
            <span class="text-[20px]">{{ $t("feed.feed_quote") }}</span>
          </div>

          <!-- Search for mobile -->
          <div
            v-if="responsiveStore.showMobileSearch"
            class="w-full absolute z-40 top-0 h-[80%] bg-mobile-search py-5"
          >
            <div class="flex items-center ml-5">
              <BackArrow
                class="cursor-pointer"
                @click="responsiveStore.showMobileSearch = false"
              />

              <form @submit.prevent="search">
                <input
                  v-model="keyword"
                  type="text"
                  id="search"
                  name="search"
                  class="indent-8 bg-transparent focus:outline-none placeholder:text-[20px] text-[20px]"
                  :placeholder="$t('feed.search')"
                />
              </form>
            </div>

            <div class="w-full h-[1px] bg-border-color my-3"></div>

            <div class="ml-10">
              <h3 class="text-input-bg my-5">
                {{ $t("feed.mobile_search_movies") }}
              </h3>
              <h3 class="text-input-bg my-5">
                {{ $t("feed.mobile_search_quotes") }}
              </h3>
            </div>
          </div>

          <!-- Search for pc -->
          <form @submit.prevent="search" class="hidden md:block">
            <div class="relative ml-[32px]">
              <div
                class="flex absolute top-5 left-0 items-center pointer-events-none"
              >
                <SearchIcon />
              </div>

              <input
                v-model="keyword"
                type="text"
                id="search"
                name="search"
                class="h-[60px] indent-8 md:w-[300px] lg:w-[700px] bg-transparent border-b-[1px] border-border-color focus:outline-none placeholder:text-[20px] text-[20px]"
                :placeholder="$t('feed.search_placeholder')"
              />
            </div>
          </form>
        </div>

        <QuoteCard
          v-for="quote in quotes"
          :key="quote?.id"
          :id="quote?.id"
          :user="quote?.user"
          :quote="quote?.name?.[locale]"
          :movie="quote?.movie?.name?.[locale]"
          :year="quote?.movie?.year"
          :image="quote?.image"
        />
      </div>
    </div>
  </section>

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
import UserHeader from "@/components/layout/UserHeader.vue";

import NavMenu from "@/components/ui/NavMenu.vue";
import PenIcon from "@/components/icons/PenIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import QuoteCard from "@/components/quotes/QuoteCard.vue";
import BackArrow from "@/components/icons/BackArrow.vue";
import { useResponsiveStore } from "@/stores/responsive.js";
import { useModalStore } from "@/stores/modal.js";
import { ref, computed } from "vue";
import axios from "@/axios";
import i18n from "@/i18n/index.js";

const locale = computed(() => i18n.global.locale);

const modalStore = useModalStore();
const responsiveStore = useResponsiveStore();

const keyword = ref(null);

const quotes = ref([]);
const isQuoteLoading = ref(false);
const page = ref(1);
const last_page = ref(1);

getQuotes();

window.onscroll = function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !isQuoteLoading.value &&
    !(page.value > last_page.value)
  ) {
    getQuotes();
  }
};

async function getQuotes() {
  if (!isQuoteLoading.value) {
    isQuoteLoading.value = true;
    return await axios
      .get(`/quotes?page=${page.value}`)
      .then((res) => {
        isQuoteLoading.value = false;
        setTimeout(() => {
          isQuoteLoading.value = false;
        }, 500);
        last_page.value = res.data.quotes.last_page;
        res.data.quotes.data.forEach((quote) => {
          quotes.value.push(quote);
        });
        return page.value++;
      })
      .catch((err) => console.log(err));
  }
}

console.log(quotes.value);

async function search() {
  responsiveStore.showMobileSearch = false;
  return await axios
    .post("/search-quotes", { keyword: keyword.value })
    .then((res) => (quotes.value = res.data.quotes))
    .catch((err) => console.log(err));
}
</script>
