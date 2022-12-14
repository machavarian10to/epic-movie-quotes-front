<template>
  <TheModal
    :title="$t('home.modals.create_password')"
    :subtitle="$t('home.modals.different_password')"
  >
    <FormField
      @submit="updatePassword"
      class="mt-3 px-2 flex flex-col items-center"
      v-slot="{ meta, errors }"
    >
      <InputWrapper :title="$t('inputs.email')">
        <BaseInput
          name="emailPassword"
          type="email"
          :placeholder="$t('inputs.email_placeholder')"
          rules="required|email"
          :invalid="errors.emailPassword"
          v-model="user.email"
        />
      </InputWrapper>

      <InputWrapper :title="$t('inputs.password')">
        <BaseInput
          name="newPassword"
          type="password"
          :placeholder="$t('inputs.password_placeholder')"
          rules="required|min:8|max:15|lowercase"
          :invalid="errors.newPassword"
          v-model="user.password"
        />
      </InputWrapper>

      <InputWrapper :title="$t('inputs.confirm_password')">
        <BaseInput
          name="password_confirm"
          type="password"
          :placeholder="$t('inputs.confirm_password')"
          rules="required|match:@newPassword"
          :invalid="errors.password_confirm"
          v-model="user.password_confirmation"
        />
      </InputWrapper>

      <div @click="meta.valid ? (modalStore.modalType = 'reset-message') : ''">
        <RedButton
          :title="$t('home.modals.reset_password')"
          class="w-[360px] h-[40px] my-5"
          @click="updatePassword(meta)"
        />
      </div>

      <div class="flex items-center justify-center gap-3">
        <BackArrow
          class="cursor-pointer"
          @click="modalStore.modalType = 'user-login'"
        />
        <p class="text-modal-text text-center">
          {{ $t("home.modals.back_login") }}
        </p>
      </div>
    </FormField>
  </TheModal>
</template>

<script setup>
import { reactive } from "vue";
import { Form as FormField } from "vee-validate";
import BackArrow from "@/components/icons/BackArrow.vue";
import TheModal from "@/components/TheModal.vue";
import InputWrapper from "@/components/ui/InputWrapper.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import RedButton from "@/components/ui/RedButton.vue";

import { useUserStore } from "@/stores/user.js";
import { useModalStore } from "@/stores/modal.js";

const modalStore = useModalStore();
const userStore = useUserStore();

const user = reactive({
  token: localStorage.getItem("resetToken"),
  email: "",
  password: "",
  password_confirmation: "",
});

function updatePassword(meta) {
  if (meta.valid) {
    userStore.updatePassword(user);
    localStorage.removeItem("resetToken");
  }
}
</script>
