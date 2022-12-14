<template>
  <BackArrow
    class="cursor-pointer"
    @click="responsiveStore.showUserEdit = false"
  />

  <div v-if="addNewEmail">
    <h4 class="mt-5">
      {{ $t("buttons.add_email") }}
    </h4>

    <input
      type="email"
      :placeholder="$t('inputs.new_email_placeholder')"
      class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
      v-model="user.email"
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
        @click="addEmail"
      />
    </div>
  </div>

  <div v-else-if="responsiveStore.showUserEdit === 'username'">
    <MobileEditUsername />
  </div>

  <div v-else-if="responsiveStore.showUserEdit === 'password'">
    <MobileEditPassword />
  </div>

  <div v-else-if="responsiveStore.showUserEdit === 'emails'">
    <div class="mt-10">
      <label class="text-white font-medium my-2">{{
        $t("inputs.email")
      }}</label>
      <div class="flex items-center">
        <div class="relative">
          <div
            class="flex absolute top-7 right-5 items-center pointer-events-none"
          >
            <VerifiedIcon v-if="emailIsVerified" />
            <NotVerifiedIcon v-else />
          </div>

          <input
            disabled
            type="text"
            class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-[20px] indent-4 disabled:opacity-80"
            :class="
              emailIsVerified
                ? 'bg-verified-email border border-verified-border text-white '
                : 'bg-notverified-email border border-notverified-border text-white'
            "
            v-model="primaryEmail"
          />
        </div>
      </div>
    </div>

    <div class="mt-10 text-[20px]" v-for="email in emails" :key="email.id">
      <div>{{ email.email }}</div>
      <div class="flex items-center justify-between mt-5">
        <BlackButton
          @click="makePrimary(email.id)"
          :title="$t('profile.make_primary')"
          class="px-5 py-2"
        />

        <span
          class="ml-[35px] text-[20px] text-gray-300 cursor-pointer"
          @click="deleteEmail(email.id)"
        >
          {{ $t("profile.remove") }}
        </span>
      </div>
      <div class="w-full h-[1px] bg-border-color my-[50px]"></div>
    </div>

    <BlackButton
      class="w-full mt-10 px-5 py-2"
      @click="addNewEmail = true"
      :title="$t('buttons.add_email')"
    />
  </div>
</template>

<script setup>
import BlackButton from "@/components/ui/BlackButton.vue";
import RedButton from "@/components/ui/RedButton.vue";
import BackArrow from "@/components/icons/BackArrow.vue";
import VerifiedIcon from "@/components/icons/VerifiedIcon.vue";
import NotVerifiedIcon from "@/components/icons/NotVerifiedIcon.vue";
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useResponsiveStore } from "@/stores/responsive.js";
import axios from "@/axios";
import MobileEditUsername from "@/components/responsive/MobileEditUsername.vue";
import MobileEditPassword from "@/components/responsive/MobileEditPassword.vue";

const userStore = useUserStore();
const responsiveStore = useResponsiveStore();

const user = reactive({
  email: null,
});

function addEmail() {
  userStore.addEmail(user);
}

const emailIsVerified = userStore.userData.email_verified_at;

const primaryEmail = userStore.userData.email;
const emails = userStore.userData.emails;

const addNewEmail = ref(false);

async function deleteEmail(id) {
  await axios
    .delete(`/delete-email/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

async function makePrimary(id) {
  await axios
    .post(`/make-primary-email/${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
</script>
