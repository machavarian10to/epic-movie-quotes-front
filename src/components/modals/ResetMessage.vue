<template>
  <TheModal title="Success!">
    <template #header>
      <div class="flex justify-center my-3">
        <SuccessIcon />
      </div>
    </template>

    <h4 class="text-center text-white py-5">
      Your password changed successfully
    </h4>
    <RedButton
      title="Go to my news feed"
      class="w-[360px] h-[40px] my-5"
      @click="redirect"
    ></RedButton>
  </TheModal>
</template>

<script setup>
import TheModal from "@/components/TheModal.vue";
import SuccessIcon from "@/components/icons/SuccessIcon.vue";
import RedButton from "@/components/ui/RedButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function redirect() {
  router.push({ name: "feed" });
}
</script>
