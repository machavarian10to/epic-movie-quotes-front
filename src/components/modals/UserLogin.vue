<template>
  <TheModal
    :title="$t('home.modals.login_account')"
    :subtitle="$t('home.modals.welcome')"
  >
    <FormField
      @submit="loginUser"
      class="mt-3 px-2 flex flex-col items-center"
      v-slot="{ meta, errors }"
    >
      <InputWrapper :title="$t('inputs.email')">
        <BaseInput
          name="loginEmail"
          type="text"
          :placeholder="$t('inputs.email_placeholder')"
          rules="required"
          :invalid="errors.loginEmail"
          v-model="user.email"
        />
      </InputWrapper>

      <InputWrapper :title="$t('inputs.password')">
        <BaseInput
          name="loginPassword"
          type="password"
          :placeholder="$t('inputs.password_placeholder')"
          rules="required|min:8|max:15|lowercase"
          :invalid="errors.loginPassword"
          v-model="user.password"
        />
      </InputWrapper>

      <div class="flex justify-between mt-5">
        <div class="flex items-center">
          <input type="checkbox" id="remember" />
          <label for="remember" class="text-white ml-2">{{
            $t("home.modals.remember")
          }}</label>
        </div>

        <span
          @click="modalStore.modalType = 'forgot-password'"
          class="text-modal-link ml-24 underline cursor-pointer"
          >{{ $t("home.modals.forgot") }}</span
        >
      </div>

      <RedButton
        :title="$t('buttons.sign_in')"
        class="w-[360px] h-[40px] my-5"
        @click="loginUser(meta)"
      />

      <BlackButton
        :title="$t('buttons.google_sign_in')"
        class="w-[360px] h-[40px]"
        type="button"
        @click="googleAuth()"
      >
        <GoogleIcon />
      </BlackButton>

      <p class="text-modal-text text-center mt-10">
        {{ $t("home.modals.not_member") }}
        <span
          @click="modalStore.modalType = 'user-register'"
          class="text-modal-link underline cursor-pointer"
          >{{ $t("buttons.sign_up") }}</span
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
