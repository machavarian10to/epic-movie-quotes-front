<template>
  <TheModal title="Check your email">
    <template #header>
      <div class="flex justify-center my-3">
        <FeedbackIcon />
      </div>
    </template>

    <h4 class="text-center text-white py-5">
      We have sent a password recover instructions to your email
    </h4>
    <RedButton class="w-[360px] h-[40px] my-5">
      <a href="https://gmail.com" class="inline-block w-full" target="_blank"
        >Go to my email</a
      >
    </RedButton>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/TheModal.vue";
import FeedbackIcon from "@/components/icons/FeedbackIcon.vue";
import RedButton from "@/components/ui/RedButton.vue";
</script>
