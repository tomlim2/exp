<template>
  <div class="page interaction-page">
    <IxBtnA />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/sections/Interaction/IxBtnA.vue";

export default defineComponent({
  components: { IxBtnA },
  setup() {
    const state: any = {};

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.page{
  margin-top: 80px;
}
</style>

