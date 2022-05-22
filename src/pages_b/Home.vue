<template>
  <div class="page">
    <div>
      <swiper
        :slides-per-view="3"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        ...
      </swiper>
    </div>

    <div>
      memo
      <p>
        <a
          href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
          target="_blank"
          rel="noopener noreferrer"
          >https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask</a
        >
      </p>
      <!-- <ul>
      <li>YCS Store front and data binding</li>
      <li>Doggo front and data binding + 3D modeling for journey (3d experience but delayed)</li>
    </ul> -->
    </div>
  </div>
  <div><LottieTest /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import LottieTest from "@/sections/home/LottiesTest.vue";

// Import Swiper styles
import "swiper/swiper.scss";

export default defineComponent({
  name: "Home",
  components: { Swiper, SwiperSlide, LottieTest },
  setup() {
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      LottieTest,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";
</style>