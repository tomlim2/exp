<template>
  <div class="page interaction-page">
    <IxBtnA />
    <!-- <OutlineThreejsA /> -->
    <ThreejsBPortal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/sections/interaction/IxBtnA.vue";
// import OutlineThreejsA from "@/sections/interaction/OutlineThreejsA.vue";
import ThreejsBPortal from "@/sections/interaction/ThreejsBPortal.vue";

export default defineComponent({
  components: {
    IxBtnA,
    // OutlineThreejsA,
    ThreejsBPortal,
  },
  setup() {
    const state: any = {};

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.page {
  margin-top: 80px;
}
</style>