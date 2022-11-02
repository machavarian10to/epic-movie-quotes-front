<template>
  <TheModal
    title="Create new password"
    subtitle="Your new password must be different from previous used passwords"
  >
    <FormField @submit="changePassword" class="mt-3" v-slot="{ meta, errors }">
      <InputWrapper title="Password">
        <BaseInput
          name="newPassword"
          type="password"
          placeholder="At least 8 & max.15 lower case characters"
          rules="required|min:8|max:15|lowercase"
          :invalid="errors.newPassword"
          v-model="user.password"
        />
      </InputWrapper>

      <InputWrapper title="Confirm password">
        <BaseInput
          name="password_confirm"
          type="password"
          placeholder="Confirm password"
          rules="required|match:@newPassword"
          :invalid="errors.password_confirm"
          v-model="user.password_confirm"
        />
      </InputWrapper>

      <RedButton
        title="Reset password"
        class="w-[360px] h-[40px] my-5"
        @click="
          meta.valid
            ? $emit('changeModal', 'reset-message') && changePassword
            : false
        "
      />

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
import { reactive } from "vue";
import { Form as FormField } from "vee-validate";
import BackArrow from "@/components/icons/BackArrow.vue";
import TheModal from "@/components/TheModal.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import RedButton from "@/components/ui/RedButton.vue";

defineEmits(["changeModal"]);

const user = reactive({
  password: "",
  password_confirm: "",
});

function changePassword() {}
</script>
