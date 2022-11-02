<template>
  <header>
    <div class="flex justify-between items-center p-7">
      <h3 class="uppercase font-bold text-golden">movie quotes</h3>
      <div class="flex items-center">
        <div class="flex items-center mr-5 cursor-pointer">
          <div class="text-white mr-3">Eng</div>
          <TheArrow />
        </div>

        <RedButton
          title="Sign Up"
          class="w-[100px] h-[40px] mx-5"
          @click="modalType = 'user-register'"
        />
        <BlackButton
          title="Log in"
          class="w-[100px] h-[40px]"
          @click="modalType = 'user-login'"
        />
      </div>
    </div>

    <Teleport to="body">
      <div v-if="modalType" @wheel.prevent @touchmove.prevent @scroll.prevent>
        <div
          @click="modalType = null"
          class="fixed inset-0 z-10 h-[100vh] w-full text-black-rgba backdrop-blur-[3px]"
        ></div>

        <keep-alive>
          <component @changeModal="changeModal" :is="modalType"></component>
        </keep-alive>
      </div>
    </Teleport>
  </header>
</template>

<script setup>
import TheArrow from "@/components/icons/TheArrow.vue";
import RedButton from "@/components/ui/RedButton.vue";
import BlackButton from "@/components/ui/BlackButton.vue";

import { ref } from "vue";

let modalType = ref(null);

function changeModal(modal) {
  modalType.value = modal;
}
</script>
