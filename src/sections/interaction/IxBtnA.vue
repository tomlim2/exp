<template>
  <div class="ix-btn-a">
    <div class="container">
      <IxBtnA
        v-for="(item, index) in ixBtnA"
        :key="index"
        :img="item.img"
        :borderGradient="item.borderGradient"
        :glare="item.glare"
        title="IxBtnA"
        description="Sample"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/components/interaction/IxBtnA.vue";

export default defineComponent({
  components: { IxBtnA },
  setup() {
    const state: any = {};

    const ixBtnA = [
      {
        img: require("@/assets/icon/icon-tech-1.svg"),
        borderGradient:
          "linear-gradient(135.89deg, rgba(185, 102, 123, 0.3) -5.87%, rgba(9, 27, 32, 0.3) 53.43%), rgb(16, 16, 16)",
        glare:
          "linear-gradient(0deg,rgba(255, 255, 255, 0) 0%,rgba(185, 102, 123, 0.3) 100%)",
      },
      {
        img: require("@/assets/icon/icon_tech_2.svg"),
        borderGradient:
          "linear-gradient(135.89deg, rgba(42, 165, 113, 0.3) -5.87%, rgba(38, 26, 78, 0.3) 53.43%), rgb(16, 16, 16)",
        glare:
          "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(42, 165, 113, 0.3) 100%)",
      },
      {
        img: require("@/assets/icon/icon_tech_3.svg"),
        borderGradient:
          "linear-gradient(135.89deg, rgba(189, 90, 226, 0.3) -5.87%, rgba(33, 27, 58, 0.3) 53.43%)",
        glare:
          "linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(189, 90, 226, 0.3) 100%)",
      },
      {
        img: require("@/assets/icon/icon_tech_4.svg"),
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
@import "~@/theme/style.scss";
.ix-btn-a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: $black-0;
  z-index: 10;

  .container {
    display: grid;
    grid-template-columns: 300px 300px;
    gap: 24px;
  }
}
</style>