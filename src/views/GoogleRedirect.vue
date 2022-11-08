<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  window.location.href = route.query.url;
});
</script>
