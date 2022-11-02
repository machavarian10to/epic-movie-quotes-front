<template>
  <TheHeader />
  <section>
    <div class="mx-auto my-[30vh] text-center">
      <h3 class="text-golden text-6xl font-montserrat font-bold">
        Find any quote in
      </h3>
      <h3 class="text-golden text-6xl font-montserrat font-bold my-8">
        millions of movie lines
      </h3>
      <RedButton title="Get Started" class="w-[100px] h-[40px] mx-5" />
    </div>
  </section>

  <section>
    <div
      class="h-[100vh] bg-test-image bg-center bg-no-repeat bg-cover relative"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :visible="{ opacity: 1, y: 0 }"
    >
      <div class="gradient w-full h-full"></div>
      <div class="absolute top-[30%] left-10 flex">
        <TheLine class="mt-8 mr-5" />
        <div>
          <h3
            class="text-white font-montserrat font-bold text-[50px] w-[800px]"
          >
            “You have to leave something behind to go forward”
          </h3>
          <p class="text-light-gray text-[30px] font-bold mt-5">
            Interstellar, 2014
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
</script>

<style scope>
body {
  background: black;
}
.gradient {
  background: linear-gradient(
    180deg,
    rgba(17, 16, 26, 0.95) 0%,
    rgba(8, 8, 13, 0.13) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
