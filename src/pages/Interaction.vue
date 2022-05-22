<template>
  <div class="page interaction-page">
    <IxBtnA />
    <OutlineThreejsA />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/sections/Interaction/IxBtnA.vue";
import OutlineThreejsA from "@/sections/Interaction/OutlineThreejsA.vue";

export default defineComponent({
  components: { IxBtnA, OutlineThreejsA },
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