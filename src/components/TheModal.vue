<template>
  <div
    class="bg-modal-bg pt-14 pb-10 px-2 md:px-[120px] w-[100%] md:w-[600px] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] fixed z-50 rounded-[10px]"
  >
    <slot name="header" />

    <h3 class="text-center text-white text-[24px] md:text-[32px] font-semibold">
      {{ title }}
    </h3>
    <h5 class="text-modal-text text-center mt-2">{{ subtitle }}</h5>

    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>
