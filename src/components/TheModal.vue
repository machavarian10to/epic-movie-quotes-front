<template>
  <div
    class="bg-modal-bg w-[600px] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] py-10 px-[120px] fixed z-50 rounded-[10px]"
  >
    <slot name="header" />

    <h3 class="text-center text-white text-[32px] font-semibold">
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
