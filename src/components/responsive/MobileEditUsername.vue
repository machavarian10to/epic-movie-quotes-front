<template>
  <div>
    <h4 class="mt-5">
      {{ $t("inputs.username") }}
    </h4>

    <input
      type="email"
      :placeholder="$t('inputs.username')"
      class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
      v-model="user.name"
    />

    <div class="flex justify-around items-center mt-10 px-5">
      <button
        type="button"
        class="bg-transparent"
        @click="responsiveStore.showUserEdit = false"
      >
        {{ $t("buttons.cancel") }}
      </button>
      <RedButton
        type="submit"
        :title="$t('buttons.add')"
        class="w-[160px] h-[50px]"
        @click="editUsername"
      />
    </div>
  </div>
</template>

<script setup>
import { useResponsiveStore } from "@/stores/responsive.js";
import RedButton from "@/components/ui/RedButton.vue";
import { reactive } from "vue";
import axios from "@/axios";

const responsiveStore = useResponsiveStore();

const user = reactive({
  name: null,
});

function editUsername() {
  axios
    .post("/update-profile", user)
    .then((res) => console.log(res))
    .catch((res) => console.log(res));
}
</script>
