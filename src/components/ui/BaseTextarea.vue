<template>
  <Field
    as="textarea"
    :id="name"
    :name="name"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="w-full h-[70px] mt-5 rounded-[5px] bg-transparent focus:outline-none p-3 text-[20px] border border-modal-text placeholder:text-white resize-none"
    :rules="rules"
    :class="invalid ? 'border-[2px] border-red-500' : ''"
    :value="value"
  />
  <ErrorMessage class="text-red-500" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
defineProps(["name", "placeholder", "rules", "invalid", "value"]);
</script>
