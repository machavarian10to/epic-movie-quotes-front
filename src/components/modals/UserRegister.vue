<template>
  <TheModal
    :title="$t('home.modals.create_account')"
    :subtitle="$t('home.modals.start_journey')"
  >
    <FormField
      @submit="registerUser"
      class="mt-3 px-2 flex flex-col items-center"
      v-slot="{ meta, errors }"
    >
      <InputWrapper :title="$t('inputs.name')">
        <BaseInput
          name="name"
          type="text"
          :placeholder="$t('inputs.name_placeholder')"
          rules="required|min:3|max:15|lowercase"
          :invalid="errors.name"
          v-model="user.name"
        />
      </InputWrapper>

      <InputWrapper :title="$t('inputs.email')">
        <BaseInput
          name="email"
          type="email"
          :placeholder="$t('inputs.email_placeholder')"
          rules="required|email"
          :invalid="errors.email"
          v-model="user.email"
        />
      </InputWrapper>

      <InputWrapper :title="$t('inputs.password')">
        <BaseInput
          name="password"
          type="password"
          :placeholder="$t('inputs.password_placeholder')"
          rules="required|min:8|max:15|lowercase"
          :invalid="errors.password"
          v-model="user.password"
        />
      </InputWrapper>

      <InputWrapper :title="$t('inputs.confirm_password')">
        <BaseInput
          name="password_confirmation"
          type="password"
          :placeholder="$t('inputs.confirm_password')"
          rules="required|match:@password"
          :invalid="errors.confirmation"
          v-model="user.password_confirmation"
        />
      </InputWrapper>

      <div
        @click="
          meta.valid ? (modalStore.modalType = 'verification-message') : ''
        "
      >
        <RedButton
          :title="$t('buttons.start')"
          class="w-[360px] h-[40px] my-5"
          @click="registerUser(meta)"
        />
      </div>

      <BlackButton
        :title="$t('buttons.google_sign_up')"
        class="w-[360px] h-[40px]"
        type="button"
        @click="googleAuth()"
      >
        <GoogleIcon />
      </BlackButton>

      <p class="text-modal-text text-center mt-10">
        {{ $t("home.modals.already_member") }}
        <span
          @click="modalStore.modalType = 'user-login'"
          class="text-modal-link underline cursor-pointer"
          >{{ $t("buttons.login") }}</span
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

function googleAuth() {
  userStore.googleAuth();
}
</script>
