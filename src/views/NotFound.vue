<template>
  <div class="flex justify-center mt-40 text-white">
    <div class="flex justify-center flex-col items-center">
      <ErrorIcon />
      <HoleIcon class="mt-7" />

      <h2 class="text-3xl md:text-5xl mt-7 font-semibold">Whoops!</h2>
      <h4 class="md:text-[22px] text-[16px] px-3 mt-6">
        We can't see the page you are looking for
      </h4>

      <router-link :to="{ name: 'home' }" class="mt-10">
        <RedButton title="Return home" class="w-[150px] h-[50px]" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import ErrorIcon from "@/components/icons/ErrorIcon.vue";
import HoleIcon from "@/components/icons/HoleIcon.vue";
import RedButton from "@/components/ui/RedButton.vue";
</script>
