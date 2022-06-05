<template>
  <div class="page interaction-page">
    <IxBtnA />
    <!-- <OutlineThreejsA /> -->
    <OutlineThreejsB />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/sections/interaction/IxBtnA.vue";
// import OutlineThreejsA from "@/sections/interaction/OutlineThreejsA.vue";
import OutlineThreejsB from "@/sections/interaction/OutlineThreejsB.vue";

export default defineComponent({
  components: { IxBtnA, 
  // OutlineThreejsA, 
  OutlineThreejsB },
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