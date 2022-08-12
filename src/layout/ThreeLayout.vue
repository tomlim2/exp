<template>
  <div class="webgl-layout">
    <ThreeNavigator />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThreeNavigator from "@/components/three/ThreeNavigator.vue";

export default defineComponent({
  name: "threeLayout",
  components: {
    ThreeNavigator,
  },
});
</script>