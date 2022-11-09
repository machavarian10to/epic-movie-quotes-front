<template>
  <button
    class="bg-button-basic hover:bg-button-hover active:bg-button-active rounded text-white"
  >
    {{ title }}
    <slot />
  </button>
</template>

<script setup>
defineProps({
  title: String,
});
</script>
