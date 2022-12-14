<template>
  <div class="flex items-center my-[24px] gap-3">
    <span class="text-[20px]">{{ comments?.length }}</span>
    <CommentIcon />

    <span class="text-[20px] ml-[24px]">{{ totalLikes }}</span>
    <LikeIcon @click="quoteLike" :color="ifLiked < 1 ? 'white' : 'red'" />
  </div>

  <div class="w-full border border-border-color"></div>

  <div class="max-h-[500px] overflow-y-scroll">
    <div
      class="flex my-[20px] items-center text-[20px] max-h-[400px]"
      v-for="comment in comments"
      :key="comment.id"
    >
      <img
        class="w-[60px] h-[60px] rounded-full"
        :src="
          comment.user.google_id
            ? comment.user.image
            : comment.user.image
            ? backendUrl + comment.user.image
            : 'https://placehold.jp/30/fe3b1f/ffffff/200x200.png?text=Redberry'
        "
      />

      <div class="border-b border-border-color ml-5 py-4 w-full">
        <h3 class="text-[24px]">{{ comment?.user?.name }}</h3>
        <p class="text-input-bg">
          {{ comment?.body }}
        </p>
      </div>
    </div>
  </div>

  <form @submit.prevent="addComment">
    <div class="flex items-center mt-3">
      <ProfilePhoto class="w-[60px] h-[60px] rounded-full" />
      <textarea
        v-model="comment.body"
        @keydown.enter.exact.prevent="addComment"
        class="ml-[24px] mt-3 w-full bg-user-header rounded-[10px] p-3 focus:outline-none text-[20px] resize-none"
        :placeholder="$t('feed.comment_placeholder')"
      ></textarea>
    </div>
  </form>
</template>

<script setup>
import ProfilePhoto from "@/components/simplify/ProfilePhoto.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import LikeIcon from "@/components/icons/LikeIcon.vue";
import { ref, onMounted, reactive } from "vue";
import axios from "@/axios";
import { useUserStore } from "@/stores/user.js";
const props = defineProps(["id", "user"]);
const backendUrl = import.meta.env.VITE_IMAGES_URL;

const comments = ref([]);

const ifLiked = ref("");

const totalLikes = ref(null);

const userStore = useUserStore();

getComments();

window.Echo.channel("comment-channel").listen(".new-comment", (e) => {
  comments.value.push(e.comment);
});

window.Echo.channel("like-channel").listen(".new-like", (e) => {
  totalLikes.value++;
  if (e.like.user_id === userStore.userData.id) {
    ifLiked.value++;
  }
});

const comment = reactive({
  body: null,
  to_id: props.user.id,
});

async function addComment() {
  await axios
    .post(`/quotes/${props.id}/comments`, comment)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  comment.body = null;
}

async function getComments() {
  await axios
    .get(`/quotes/${props.id}/comments`)
    .then((res) => (comments.value = res.data.comments))
    .catch((err) => console.log(err));
}

function quoteLike() {
  return ifLiked.value < 1 ? likeQuote() : unlikeQuote();
}

async function likeQuote() {
  await axios
    .post(`/like-quote/${props.id}`, { to_id: props.user.id })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

async function unlikeQuote() {
  await axios
    .post(`/unlike-quote/${props.id}`)
    .then(() => {
      totalLikes.value--;
      ifLiked.value--;
    })
    .catch((err) => console.log(err));
}

onMounted(async () => {
  await axios
    .get(`/get-likes/${props.id}`)
    .then((res) => (totalLikes.value = res.data.like))
    .catch((err) => console.log(err));
});

onMounted(async () => {
  await axios
    .get(`/check-likes/${props.id}`)
    .then((res) => (ifLiked.value = res.data.like))
    .catch((err) => console.log(err));
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
