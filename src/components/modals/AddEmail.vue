<template>
  <div
    class="bg-quote-color top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[615px] h-[367px] fixed z-50 rounded-[10px] text-white backdrop-blur-xl"
  >
    <header>
      <h4 class="text-[24px] font-semibold my-6 ml-8">
        {{ $t("buttons.add_email") }}
      </h4>
      <div class="w-full h-[1px] bg-border-color"></div>
    </header>
    <section class="flex items-center justify-center flex-col">
      <div class="mt-[60px]">
        <label class="text-white font-medium my-2">{{
          $t("inputs.new_email")
        }}</label>
        <div>
          <input
            type="email"
            :placeholder="$t('inputs.new_email_placeholder')"
            class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
            v-model="user.email"
          />
        </div>

        <div class="flex justify-end mt-[50px] gap-7 text-[20px]">
          <button
            type="button"
            class="bg-transparent"
            @click="modalStore.modalType = null"
          >
            {{ $t("buttons.cancel") }}
          </button>
          <RedButton
            :title="$t('buttons.add')"
            class="px-5 h-[50px]"
            @click="addNewEmail"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import RedButton from "@/components/ui/RedButton.vue";
import { useModalStore } from "@/stores/modal.js";
import { useUserStore } from "@/stores/user.js";
import { reactive } from "vue";

const modalStore = useModalStore();
const userStore = useUserStore();

const user = reactive({
  email: null,
});

function addNewEmail() {
  userStore.addEmail(user);
  modalStore.modalType = null;
}
</script>
