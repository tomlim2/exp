<template>
  <div class="three-page">
    <ThreejsA />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ThreejsA from "@/sections/interaction/ThreejsA.vue";

export default defineComponent({
  components: {
    ThreejsA,
  },
  setup() {
    const state: any = {};

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.three-page {
    background-color: red;
}
</style>