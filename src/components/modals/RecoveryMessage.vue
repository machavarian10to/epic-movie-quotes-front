<template>
  <TheModal :title="$t('home.modals.check_email')">
    <template #header>
      <div class="flex justify-center my-3">
        <FeedbackIcon />
      </div>
    </template>

    <div class="flex flex-col items-center">
      <h4 class="text-center text-white py-5">
        {{ $t("home.modals.sent_recovery") }}
      </h4>
      <RedButton class="w-[360px] h-[40px] my-5">
        <a
          href="https://gmail.com"
          class="inline-block w-full"
          target="_blank"
          >{{ $t("buttons.goto_email") }}</a
        >
      </RedButton>
    </div>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/TheModal.vue";
import FeedbackIcon from "@/components/icons/FeedbackIcon.vue";
import RedButton from "@/components/ui/RedButton.vue";
</script>
