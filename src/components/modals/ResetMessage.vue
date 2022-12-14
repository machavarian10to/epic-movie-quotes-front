<template>
  <TheModal :title="$t('home.modals.success')">
    <template #header>
      <div class="flex justify-center my-3">
        <SuccessIcon />
      </div>
    </template>

    <div class="px-2 flex flex-col items-center">
      <h4 class="text-center text-white py-5">
        {{ $t("home.modals.changed") }}
      </h4>
      <RedButton
        :title="$t('buttons.login')"
        class="w-[360px] h-[40px] my-5"
        @click="modalStore.modalType = 'user-login'"
      ></RedButton>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/TheModal.vue";
import SuccessIcon from "@/components/icons/SuccessIcon.vue";
import RedButton from "@/components/ui/RedButton.vue";
import { useModalStore } from "@/stores/modal.js";

const modalStore = useModalStore();
</script>
