<script setup>
import axios from "@/axios";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const config = {
  headers: {
    Authorization: "Bearer abcdefghjkl",
  },
};

onMounted(() => {
  return axios
    .get(`/google/callback?code=${route.query.code}`, config)
    .then((res) => {
      userStore.authenticated = true;
      userStore.userData = res.data.user;
      router.push({ name: "feed" });
    })
    .catch((err) => console.log(err));
});
</script>
