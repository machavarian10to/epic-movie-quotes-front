<template>
  <TheModal
    :title="$t('home.modals.forgot')"
    :subtitle="$t('home.modals.enter_email')"
  >
    <FormField
      @submit="sendReset"
      class="mt-3 px-2 flex flex-col items-center"
      v-slot="{ meta, errors }"
    >
      <InputWrapper :title="$t('inputs.email')">
        <BaseInput
          name="resetEmail"
          type="email"
          :placeholder="$t('inputs.email_placeholder')"
          rules="required|email"
          :invalid="errors.resetEmail"
          v-model="user.email"
        />
      </InputWrapper>

      <div
        @click="meta.valid ? (modalStore.modalType = 'recovery-message') : ''"
      >
        <RedButton
          :title="$t('buttons.send_instructions')"
          class="w-[360px] h-[40px] my-5"
          @click="sendReset(meta)"
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
import { Form as FormField } from "vee-validate";
import BackArrow from "@/components/icons/BackArrow.vue";
import TheModal from "@/components/TheModal.vue";
import InputWrapper from "@/components/ui/InputWrapper.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import RedButton from "@/components/ui/RedButton.vue";
import { reactive } from "vue";

import { useUserStore } from "@/stores/user.js";
import { useModalStore } from "@/stores/modal.js";

const modalStore = useModalStore();
const userStore = useUserStore();

const user = reactive({
  email: "",
});

function sendReset(meta) {
  if (meta.valid) {
    userStore.resetPassword(user);
  }
}
</script>
