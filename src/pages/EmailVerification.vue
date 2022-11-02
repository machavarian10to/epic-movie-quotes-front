<script setup>
import { onMounted } from "vue";
import axios from "@/axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  try {
    const params = new URLSearchParams(route.query);
    await axios.get(
      "/email-verify/" + route.params.id + "/" + route.params.hash,
      {
        params,
      }
    );
    router.push({ name: "home" });
  } catch (error) {
    console.log(error.response);
    // router.push({ name: "home" });
  }
});
</script>
