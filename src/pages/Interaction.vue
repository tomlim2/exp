<template>
  <div class="interaction-page">
    <div class="other">
      <OtherButtonV2 v-for="(item, index) in 4" :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OtherButtonV2 from "@/components/Interaction/OtherbuttonV2.vue";

export default defineComponent({
  components: {  OtherButtonV2 },
  setup() {
    const state: any = {};

    return { state };
  },
});
</script>

<style lang="scss" scoped>
.interaction-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: black;

  .other {
    display: grid;
    grid-template-columns: 300px 300px;
    gap: 24px;
  }
}
</style>

