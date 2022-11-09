<script setup>
import axios from "@/axios";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { setToken } from "@/components/helpers/index";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  return axios
    .get(`/google/callback?code=${route.query.code}`)
    .then((res) => {
      setToken(res.data.access_token, res.data.expires_in);
      router.push({ name: "feed" });
    })
    .catch((err) => console.log(err));
});
</script>
