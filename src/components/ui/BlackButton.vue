<template>
  <button
    class="border-[1px] hover:opacity-90 active:opacity-80 border-white text-white rounded"
  >
    <div class="flex justify-center items-center gap-3">
      <slot />
      {{ title }}
    </div>
  </button>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
