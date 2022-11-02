<template>
  <TheModal title="Create an account" subtitle="Start your journey!">
    <FormField @submit="registerUser" class="mt-3" v-slot="{ meta, errors }">
      <InputWrapper title="Name">
        <BaseInput
          name="name"
          type="text"
          placeholder="At least 3 & max.15 lower case characters"
          rules="required|min:3|max:15|lowercase"
          :invalid="errors.name"
          v-model="user.name"
        />
      </InputWrapper>

      <InputWrapper title="Email">
        <BaseInput
          name="email"
          type="email"
          placeholder="Enter your email"
          rules="required|email"
          :invalid="errors.email"
          v-model="user.email"
        />
      </InputWrapper>

      <InputWrapper title="Password">
        <BaseInput
          name="password"
          type="password"
          placeholder="At least 8 & max.15 lower case characters"
          rules="required|min:8|max:15|lowercase"
          :invalid="errors.password"
          v-model="user.password"
        />
      </InputWrapper>

      <InputWrapper title="Confirm password">
        <BaseInput
          name="password_confirmation"
          type="password"
          placeholder="Confirm password"
          rules="required|match:@password"
          :invalid="errors.confirmation"
          v-model="user.password_confirmation"
        />
      </InputWrapper>

      <div
        @click="meta.valid ? $emit('changeModal', 'verification-message') : ''"
      >
        <RedButton
          title="Get started"
          class="w-[360px] h-[40px] my-5"
          @click="registerUser(meta)"
        />
      </div>

      <BlackButton
        title="Sign up with Google"
        class="w-[360px] h-[40px]"
        @click="registerWithGmail(meta)"
      >
        <GoogleIcon />
      </BlackButton>

      <p class="text-modal-text text-center mt-10">
        Already have an account?
        <span
          @click="$emit('changeModal', 'user-login')"
          class="text-modal-link underline cursor-pointer"
          >Log in</span
        >
      </p>
    </FormField>
  </TheModal>
</template>

<script setup>
import { reactive } from "vue";
import { Form as FormField } from "vee-validate";
import TheModal from "@/components/TheModal.vue";
import InputWrapper from "@/components/ui/InputWrapper.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import RedButton from "@/components/ui/RedButton.vue";
import BlackButton from "@/components/ui/BlackButton.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";

import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

function registerUser(meta) {
  if (meta.valid) {
    userStore.register(user);
  }
}

function registerWithGmail(meta) {
  meta.valid ? alert("gmail registration") : alert("not valid");
}

defineEmits(["changeModal"]);
</script>
