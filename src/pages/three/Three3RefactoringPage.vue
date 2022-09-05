<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import Experience from "./Three3RefactorPage/Experience";

export default defineComponent({
  setup() {
    const state = reactive({});

    onMounted(() => {
      const experience = new Experience(
        document.querySelector("#render-journey-texture")
      );
      experience;
    });

    onUnmounted(() => {
      const experience = new Experience(
        document.querySelector("#render-journey-texture")
      );

      experience.destroy;
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.three-journey-texture {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $black-200;
  z-index: 20;
}
</style>

