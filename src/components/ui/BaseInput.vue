<template>
  <Field
    :id="name"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    class="bg-input-bg rounded-[4px] w-[360px] h-[40px] indent-[12px] placeholder:text-modal-text focus:outline-none"
    :rules="rules"
    :class="invalid ? 'border-[2px] border-red-500' : ''"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <ErrorMessage class="text-red-500 mt-3" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

defineProps(["name", "type", "placeholder", "rules", "invalid"]);
</script>
