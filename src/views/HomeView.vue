<template>
  <TheHeader />
  <section>
    <div class="mx-auto my-[30vh] text-center">
      <h3 class="text-golden text-[24px] md:text-6xl font-montserrat font-bold">
        {{ $t("home.quote") }}
      </h3>
      <h3
        class="text-golden text-[24px] md:text-6xl font-montserrat font-bold my-8"
      >
        {{ $t("home.movie") }}
      </h3>
      <RedButton
        :title="$t('buttons.start')"
        @click="modalStore.modalType = 'user-login'"
        class="w-[105px] md:w-[135px] text-[16px] md:text-[20px] h-[50px] mx-5"
      />
    </div>
  </section>

  <section>
    <div
      v-for="quote in quotes"
      :key="quote.id"
      :class="quote.image"
      class="h-[100vh] w-[100%] bg-center bg-no-repeat bg-cover relative bg-fixed"
    >
      <div class="gradient w-full h-full"></div>

      <div class="absolute top-[30%] left-10 flex">
        <TheLine class="mt-8 mr-5" />

        <div>
          <h3
            class="text-white font-montserrat font-bold text-[20px] md:text-[40px]"
          >
            {{ quote.quote }}
          </h3>
          <p class="text-light-gray text-[16px] md:text-[30px] font-bold mt-5">
            {{ quote.movie }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheLine from "@/components/icons/TheLine.vue";
import RedButton from "@/components/ui/RedButton.vue";
import { useModalStore } from "@/stores/modal.js";
import { reactive } from "vue";
const modalStore = useModalStore();

const quotes = reactive([
  {
    id: 1,
    image: "bg-first-image",
    quote: "“You have to leave something behind to go forward”",
    movie: "Interstellar, 2014",
  },
  {
    id: 2,
    image: "bg-second-image",
    quote:
      "“I think we're just gonna have to be secretly in love with each other and leave it that”",
    movie: "The Royal Tenenbaums,2001 ",
  },
  {
    id: 3,
    image: "bg-third-image",
    quote:
      "“I think we're just gonna have to be secretly in love with each other and leave it that”",
    movie: "The Royal Tenenbaums,2001 ",
  },
]);
</script>

<style scope>
.gradient {
  background: linear-gradient(
    180deg,
    rgba(17, 16, 26, 0.95) 0%,
    rgba(8, 8, 13, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
