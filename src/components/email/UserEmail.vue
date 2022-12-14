<template>
  <div class="my-5">
    <label class="text-white font-medium my-2">{{ $t("inputs.email") }}</label>
    <div class="flex items-center">
      <div class="relative">
        <div
          class="flex absolute top-7 right-5 items-center pointer-events-none"
        >
          <VerifiedIcon v-if="verified" />
          <NotVerifiedIcon v-else />
        </div>

        <input
          disabled
          type="text"
          class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-[20px] indent-4 disabled:opacity-80"
          :class="
            verified
              ? 'bg-verified-email border border-verified-border text-white '
              : 'bg-notverified-email border border-notverified-border text-white'
          "
          :value="email"
        />
      </div>

      <span v-if="!verified" class="ml-[35px] text-[20px] text-gray-300">
        {{ $t("profile.not_verified") }}
      </span>

      <span
        v-else
        class="ml-[35px] text-[20px] text-gray-300 cursor-pointer"
        @click="makePrimary"
      >
        {{ $t("profile.make_primary") }}
      </span>

      <span
        class="ml-[35px] text-[20px] text-gray-300 cursor-pointer"
        @click="deleteEmail"
      >
        {{ $t("profile.remove") }}
      </span>
    </div>
  </div>
</template>

<script setup>
import VerifiedIcon from "@/components/icons/VerifiedIcon.vue";
import NotVerifiedIcon from "@/components/icons/NotVerifiedIcon.vue";
import axios from "@/axios";

const props = defineProps(["id", "verified", "email"]);

async function deleteEmail() {
  await axios
    .delete(`/delete-email/${props.id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

async function makePrimary() {
  await axios
    .post(`/make-primary-email/${props.id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
</script>
