<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useModalStore } from "@/stores/modal.js";

const modalStore = useModalStore();

const router = useRouter();
const route = useRoute();

onMounted(() => {
  localStorage.setItem("resetToken", route.query.token);
  router.push({ name: "home" });
  modalStore.modalType = "new-password";
});
</script>
