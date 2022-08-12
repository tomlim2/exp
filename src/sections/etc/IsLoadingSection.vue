<template>
  <div class="">
    <IsLoadingAComponent />
    <br />
    <IsLoadingBComponent />
    <div>
      <div class="loading-section">
        <div class="spinning-circle"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IsLoadingAComponent from "@/components/etc/isLoading/IsLoadingAComponent.vue";
import IsLoadingBComponent from "@/components/etc/isLoading/IsLoadingBComponent.vue";

export default defineComponent({
  components: { IsLoadingAComponent, IsLoadingBComponent },
  setup() {
    const state = {};
    return { state };
  },
});
</script>

<style lang="scss" scoped>
.loading-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  .spinning-circle {
    width: 40px;
    height: 40px;
    background-color: gray;
    animation: spinning 1600ms linear infinite;
    transform-origin: center;
  }
}
@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>