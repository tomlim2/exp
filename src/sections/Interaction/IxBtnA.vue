<template>
  <div class="ix-btn-a">
    <div class="container">
      <IxBtnA
        v-for="(item, index) in ixBtnA"
        :key="index"
        :borderGradient="item.borderGradient"
        :glare="item.glare"
        title="IxBtnA"
        description="I wanna icecream, I wanna icecream, I wanna icecream, I wanna icecream"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/components/Interaction/IxBtnA.vue";

export default defineComponent({
  components: { IxBtnA },
  setup() {
    const state: any = {};

    const ixBtnA = [
      {
        borderGradient:
          "linear-gradient(135.89deg, rgba(185, 102, 123, 0.3) -5.87%, rgba(9, 27, 32, 0.3) 53.43%), rgb(16, 16, 16)",
        glare:
          "linear-gradient(0deg,rgba(255, 255, 255, 0) 0%,rgba(185, 102, 123, 0.3) 100%)",
      },
      {
        borderGradient:
          "linear-gradient(135.89deg, rgba(42, 165, 113, 0.3) -5.87%, rgba(38, 26, 78, 0.3) 53.43%), rgb(16, 16, 16)",
        glare:
          "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(42, 165, 113, 0.3) 100%)",
      },
      {
        borderGradient:
          "linear-gradient(135.89deg, rgba(189, 90, 226, 0.3) -5.87%, rgba(33, 27, 58, 0.3) 53.43%)",
        glare:
          "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(189, 90, 226, 0.3) 100%)",
      },
      {
        borderGradient:
          "linear-gradient(135.89deg, rgba(213, 65, 30, 0.3) -5.87%, rgba(7, 16, 11, 0.3) 53.43%), rgb(16, 16, 16)",
        glare:
          "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(213, 65, 30, 0.3) 100%)",
      },
    ];

    return { state, ixBtnA };
  },
});
</script>

<style lang="scss" scoped>
.ix-btn-a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 800px;
  background: black;

  .container {
    display: grid;
    grid-template-columns: 300px 300px;
    gap: 24px;
  }
}
</style>