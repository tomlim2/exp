<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/Interaction/Nabigation.vue";

export default defineComponent({
  name: "FeedsLayoutDefault",
  components: {
    Navigation,
  },
});
</script>