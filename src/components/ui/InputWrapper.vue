<template>
  <div class="flex flex-col mt-2">
    <label class="text-white font-medium my-2"
      >{{ title }} <span class="text-red-500">*</span></label
    >
    <slot />
  </div>
</template>

<script setup>
defineProps(["title"]);
</script>
