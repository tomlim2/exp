<template>
  <div class="webgl-layout">
    <WebglNavigator />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WebglNavigator from "@/components/webgl/WebglNavigator.vue";

export default defineComponent({
  name: "webglLayout",
  components: {
    WebglNavigator,
  },
});
</script>