<script setup>
import axios from "@/axios";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  return axios
    .get(`/google/callback?code=${route.query.code}`)
    .then((res) => {
      userStore.userData = res.data.user;
      userStore.authenticated = true;
      router.push({ name: "feed" });
    })
    .catch((err) => console.log(err));
});
</script>
