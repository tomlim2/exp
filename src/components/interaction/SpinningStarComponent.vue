<template>
  <div class="spinning-star">
    <img
      ref="spinningTypo"
      class="spinning-star-typo"
      src="@/assets/images/stars_typo.svg"
      alt="stars"
    />
    <img
    ref="spinningStar"
      class="spinning-star-star"
      src="@/assets/images/stars_star.svg"
      alt="stars"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const state = {};
    const spinningTypo = ref();
    const spinningStar = ref();

    onMounted(() => {
      let scrollY: number;
      window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
        spinningTypo.value.style.transform = `rotate(${scrollY / 10}deg)`;
        spinningStar.value.style.transform = `rotate(${scrollY / -10}deg)`;
      });
    });
    return { state, spinningTypo, spinningStar };
  },
});
</script>

<style lang="scss" scoped>
$star-size: 2000px;
.spinning-star {
  position: absolute;
  left: 50%;
  top: 10%;
  width: $star-size;
  height: $star-size;
  margin-left: calc( 600px / -2 );
  z-index: 8;
  .spinning-star-typo {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .spinning-star-star {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>