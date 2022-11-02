<template>
  <TheModal
    title="Forgot password?"
    subtitle="Enter the email and we'll send an email with instructions to reset your password"
  >
    <FormField @submit="sendReset" class="mt-3" v-slot="{ meta, errors }">
      <InputWrapper title="Email">
        <BaseInput
          name="resetEmail"
          type="email"
          placeholder="Enter your email"
          rules="required|email"
          :invalid="errors.resetEmail"
          v-model="user.email"
        />
      </InputWrapper>

      <div @click="meta.valid ? $emit('changeModal', 'recovery-message') : ''">
        <RedButton
          title="Send instructions"
          class="w-[360px] h-[40px] my-5"
          @click="sendReset(meta)"
        />
      </div>

      <div class="flex items-center justify-center gap-3">
        <BackArrow
          class="cursor-pointer"
          @click="$emit('changeModal', 'user-login')"
        />
        <p class="text-modal-text text-center">Back to log in</p>
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

defineEmits(["changeModal"]);

const user = reactive({
  email: "",
});

function sendReset(meta) {
  if (meta.valid) {
    alert("pass");
  }
}
</script>
