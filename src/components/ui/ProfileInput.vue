<template>
  <Field
    :id="name"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    class="w-full h-[40px] mt-4 my-2 rounded-[5px] bg-transparent focus:outline-none indent-4 text-[20px] border border-modal-text placeholder:text-white"
    :rules="rules"
    :class="invalid ? 'border-[2px] border-red-500' : ''"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="value"
  />
  <ErrorMessage class="text-red-500" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

defineProps(["name", "type", "placeholder", "rules", "invalid", "value"]);
</script>
