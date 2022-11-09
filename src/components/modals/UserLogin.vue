<template>
  <TheModal
    title="Log in to your account"
    subtitle="Welcome back! Please enter your details."
  >
    <FormField @submit="loginUser" class="mt-3" v-slot="{ meta, errors }">
      <InputWrapper title="Email">
        <BaseInput
          name="loginEmail"
          type="email"
          placeholder="Enter your email"
          rules="required|email"
          :invalid="errors.loginEmail"
          v-model="user.email"
        />
      </InputWrapper>

      <InputWrapper title="Password">
        <BaseInput
          name="loginPassword"
          type="password"
          placeholder="Password"
          rules="required|min:8|max:15|lowercase"
          :invalid="errors.loginPassword"
          v-model="user.password"
        />
      </InputWrapper>

      <div class="flex justify-between mt-5">
        <div class="flex items-center">
          <input type="checkbox" id="remember" v-model="user.remember" />
          <label for="remember" class="text-white ml-2">Remember me</label>
        </div>
        <span
          @click="modalStore.modalType = 'forgot-password'"
          class="text-modal-link underline cursor-pointer"
          >Forgot password</span
        >
      </div>

      <RedButton
        title="Sign in"
        class="w-[360px] h-[40px] my-5"
        @click="loginUser(meta)"
      />

      <BlackButton
        title="Sign in with Google"
        class="w-[360px] h-[40px]"
        type="button"
        @click="googleAuth()"
      >
        <GoogleIcon />
      </BlackButton>

      <p class="text-modal-text text-center mt-10">
        Don't have an account?
        <span
          @click="modalStore.modalType = 'user-register'"
          class="text-modal-link underline cursor-pointer"
          >Sign up</span
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
import { useModalStore } from "@/stores/modal.js";

const modalStore = useModalStore();
const userStore = useUserStore();

const user = reactive({
  email: "",
  password: "",
  remember: false,
});

function loginUser(meta) {
  if (meta.valid) {
    userStore.login(user);
    modalStore.modalType = null;
  }
}

function googleAuth() {
  userStore.googleAuth();
}
</script>
