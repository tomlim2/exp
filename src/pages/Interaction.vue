<template>
  <div class="page interaction-page">
    <CopyTextSection />
    <ThreejsCScroll />
    <ThreejsA />
    <ThreejsBPortal />
    <IxBtnA />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/sections/interaction/IxBtnA.vue";
import ThreejsA from "@/sections/interaction/ThreejsA.vue";
import ThreejsBPortal from "@/sections/interaction/ThreejsBPortal.vue";
import ThreejsCScroll from "@/sections/interaction/ThreejsCScroll.vue";
import CopyTextSection from "@/sections/interaction/CopyTextSection.vue";

export default defineComponent({
  components: {
    ThreejsCScroll,
    ThreejsBPortal,
    ThreejsA,
    IxBtnA,
    CopyTextSection,
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