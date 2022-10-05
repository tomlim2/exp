'<template>
  <div id="pattern-section" class="pattern-section">
    <div id="shader-patterns" class="shader-patterns" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import Experience from "@/sections/patterns/PatternSection/Experience";

export default defineComponent({
  setup() {
    const state = reactive({});

    onMounted(() => {
      const experience = new Experience(
        document.querySelector("#shader-patterns")
      );
      experience;
    });

    onUnmounted(() => {
      const experience = new Experience(
        document.querySelector("#shader-patterns")
      );

      experience.destroy;
    });

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.pattern-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  z-index: 20;
}
</style>

