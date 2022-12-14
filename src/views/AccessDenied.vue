<template>
  <div class="flex justify-center mt-40 text-white">
    <div class="flex justify-center flex-col items-center">
      <div class="relative w-[345px] h-[260px]">
        <GandalfIcon class="absolute z-30" />
        <GandalfBack class="absolute top-[70px] left-[55px] z-10" />
      </div>

      <h2 class="text-3xl md:text-5xl mt-7 font-semibold">
        You shall not pass!
      </h2>
      <h4 class="md:text-[22px] text-[16px] text-center mt-6 px-3">
        Sorry, but you don't have permission to access this page
      </h4>

      <router-link :to="{ name: 'home' }" class="mt-10">
        <RedButton title="Return home" class="w-[150px] h-[50px]" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import GandalfIcon from "@/components/icons/GandalfIcon.vue";
import GandalfBack from "@/components/icons/GandalfBack.vue";
import RedButton from "@/components/ui/RedButton.vue";
</script>
