<template>
  <header>
    <div class="flex justify-between items-center p-7">
      <h3 class="uppercase font-bold text-center text-golden">movie quotes</h3>
      <div class="flex items-center">
        <LocaleChanger class="hidden md:block" />

        <RedButton
          :title="$t('buttons.sign_up')"
          class="h-[40px] hidden md:block px-5 mx-5"
          @click="modalStore.modalType = 'user-register'"
        />
        <BlackButton
          :title="$t('buttons.login')"
          class="w-[100px] h-[40px]"
          @click="modalStore.modalType = 'user-login'"
        />
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="modalStore.modalType"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
      >
        <div
          @click="modalStore.modalType = null"
          class="fixed inset-0 z-10 h-[100vh] w-full text-black-rgba backdrop-blur-[3px]"
        ></div>

        <keep-alive>
          <component :is="modalStore.modalType"></component>
        </keep-alive>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import LocaleChanger from "@/components/simplify/LocaleChanger.vue";
import RedButton from "@/components/ui/RedButton.vue";
import BlackButton from "@/components/ui/BlackButton.vue";

import { useModalStore } from "@/stores/modal.js";

const modalStore = useModalStore();
</script>
