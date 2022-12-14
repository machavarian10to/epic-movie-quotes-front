<template>
  <button
    class="bg-button-basic hover:bg-button-hover active:bg-button-active text-[18px] rounded text-white"
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
