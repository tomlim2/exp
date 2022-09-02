<template>
  <div id="three-journey-texture" class="three-journey-texture">
    <div id="render-journey-texture" class="render-journey-texture" />
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import { useExperience } from "./Three3RefactorPage/Experience";

export default defineComponent({
  setup() {
    const experience = useExperience;
    const state = reactive({});

    onMounted(() => {
      experience(document.querySelector("#render-journey-texture"));
    });

    onUnmounted(()=>{
      console.log('bye');
      
      experience(document.querySelector("#render-journey-texture")).destroy
    })

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

