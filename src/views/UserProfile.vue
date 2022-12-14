<template>
  <UserHeader />

  <NavMenu :key="profileIsChanged" />

  <section class="mb-24">
    <div class="md:flex justify-center mt-32 hidden">
      <h3 class="text-[24px] text-white font-semibold mr-32">
        {{ $t("profile.my_profile") }}
      </h3>
    </div>

    <MobileProfile />

    <AddNewEmail />

    <div class="ml-[300px] hidden md:block">
      <form enctype="multipart/form-data" @submit.prevent="changeProfileInfo">
        <div class="flex items-center flex-col text-white">
          <div
            class="max-w-[900px] p-16 bg-quote-color backdrop-blur-xl rounded-[10px] mt-[120px] mx-5 relative flex justify-center items-center"
          >
            <div
              class="absolute top-[-100px] flex flex-col items-center justify-center"
            >
              <ProfilePhoto
                class="rounded-full w-[188px] h-[188px]"
                :key="profileIsChanged"
              />
              <p v-if="!detailsEditable" class="text-[20px] mt-3">
                {{ $t("profile.upload_photo") }}
              </p>

              <input
                v-if="detailsEditable"
                @change="fileChange"
                name="image"
                type="file"
                class="mt-7 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-file-input file:text-white hover:file:opacity-90"
              />
            </div>

            <div class="flex flex-col mt-24">
              <div>
                <label class="text-white font-medium my-2">{{
                  $t("inputs.username")
                }}</label>
                <div class="flex items-center">
                  <input
                    :disabled="!detailsEditable"
                    type="text"
                    class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
                    v-model="user.name"
                  />

                  <span
                    v-if="!googleId"
                    @click="detailsEditable = true"
                    class="ml-[35px] text-[20px] cursor-pointer text-gray-300"
                    :class="detailsEditable ? 'invisible' : 'visible'"
                  >
                    {{ $t("profile.edit") }}
                  </span>
                </div>
              </div>

              <!-- Divider -->
              <div
                class="mr-[70px] w-[530px] h-[1px] bg-border-color my-[50px]"
              ></div>

              <!-- If user is registered by google -->
              <div v-if="googleId">
                <label class="text-white font-medium my-2">{{
                  $t("inputs.email")
                }}</label>
                <div>
                  <input
                    disabled
                    type="email"
                    class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
                    v-model="email"
                  />
                </div>
              </div>

              <!-- If user is registered by mail -->
              <div v-if="!googleId">
                <!-- primary email -->
                <div>
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

                    <span
                      v-if="!emailIsVerified"
                      class="ml-[35px] text-[20px] text-gray-300"
                    >
                      {{ $t("profile.not_verified") }}
                    </span>
                    <span v-else class="ml-[35px] text-[20px] text-gray-300">
                      {{ $t("profile.primary_email") }}
                    </span>
                  </div>
                </div>

                <!-- Other emails -->
                <UserEmail
                  v-for="email in emails"
                  :key="email.id"
                  :id="email.id"
                  :verified="email.email_verified_at"
                  :email="email.email"
                />

                <!-- Add email -->
                <div>
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
                </div>

                <BlackButton
                  :title="$t('buttons.add_email')"
                  class="mt-8 px-5 h-[50px] py-[10px] text-[20px] text-white p-6"
                  type="button"
                  @click="modalStore.modalType = 'add-email'"
                >
                  <PlusIcon />
                </BlackButton>

                <!-- password -->
                <div class="mt-[50px]" v-if="!passwordEditable">
                  <label class="text-white font-medium my-2">{{
                    $t("inputs.password")
                  }}</label>

                  <div class="flex items-center">
                    <input
                      :key="profileIsChanged"
                      :disabled="!passwordEditable"
                      type="password"
                      :placeholder="$t('inputs.password')"
                      class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
                    />

                    <span
                      @click="passwordEditable = true"
                      class="ml-[35px] text-[20px] cursor-pointer text-gray-300"
                      :class="passwordEditable ? 'invisible' : 'visible'"
                    >
                      {{ $t("profile.edit") }}
                    </span>
                  </div>
                </div>

                <!-- New password -->
                <div class="mt-[50px]" v-if="passwordEditable">
                  <div>
                    <label class="text-white font-medium my-2">{{
                      $t("inputs.new_password")
                    }}</label>
                    <div class="flex items-center">
                      <input
                        :key="profileIsChanged"
                        :disabled="!passwordEditable"
                        type="password"
                        :placeholder="$t('inputs.new_password')"
                        class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
                        v-model="user.password"
                      />
                    </div>
                  </div>

                  <div class="mt-10">
                    <label class="text-white font-medium my-2">{{
                      $t("inputs.confirm_new_password")
                    }}</label>
                    <div class="flex items-center">
                      <input
                        :key="profileIsChanged"
                        :disabled="!passwordEditable"
                        type="password"
                        :placeholder="$t('inputs.confirm_password')"
                        class="mt-3 w-[530px] h-[50px] rounded-[4px] focus:outline-none bg-input-bg text-black text-[20px] indent-4 disabled:opacity-80"
                        v-model="user.password_confirmation"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex justify-center items-center text-[20px] text-input-bg gap-7 mt-10 ml-[750px]"
          v-if="passwordEditable || detailsEditable"
        >
          <button
            type="button"
            class="bg-transparent"
            @click="(passwordEditable = false) || (detailsEditable = false)"
          >
            {{ $t("buttons.cancel") }}
          </button>
          <RedButton
            type="submit"
            :title="$t('buttons.save')"
            class="w-[160px] h-[50px]"
            @click="changeProfileInfo"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import UserHeader from "@/components/layout/UserHeader.vue";
import NavMenu from "@/components/ui/NavMenu.vue";
import RedButton from "@/components/ui/RedButton.vue";
import BlackButton from "@/components/ui/BlackButton.vue";
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";
import VerifiedIcon from "@/components/icons/VerifiedIcon.vue";
import UserEmail from "@/components/email/UserEmail.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import NotVerifiedIcon from "@/components/icons/NotVerifiedIcon.vue";
import MobileProfile from "@/components/ui/MobileProfile.vue";
import axios from "@/axios";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useModalStore } from "@/stores/modal.js";

const modalStore = useModalStore();
const userStore = useUserStore();

const detailsEditable = ref(false);
const passwordEditable = ref(false);
const profileIsChanged = ref(false);

const googleId = userStore.userData.google_id;
const emailIsVerified = userStore.userData.email_verified_at;

const primaryEmail = userStore.userData.email;
const emails = userStore.userData.emails;

const user = reactive({
  name: userStore.userData.name,
  image: null,
  password: null,
  password_confirmation: null,
});

function fileChange(e) {
  user.image = e.target.files[0];
}

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

console.log(userStore.userData);

function changeProfileInfo() {
  let data = new FormData();
  data.append("image", user.image);
  data.append("name", user.name);
  if (user.password) {
    data.append("password", user.password);
    data.append("password_confirmation", user.password_confirmation);
  }
  axios
    .post("/update-profile", data, config)
    .then((res) => {
      userStore.userData = res.data.user;
      detailsEditable.value = false;
      passwordEditable.value = false;
      profileIsChanged.value = !profileIsChanged.value;
    })
    .catch((err) => console.log(err));
}
</script>
