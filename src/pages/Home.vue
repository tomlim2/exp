<template>
  <main class="page">
    <section>
      store.counter: {{ name }} || doubleValue:
      {{ doubleValue }}
      <button class="double-count" @click="onClick">double count</button>
    </section>
    <section>
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
    </section>

    <section>
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
    </section>
    <section><LottieTest /></section>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import LottieTest from "@/sections/home/LottiesTest.vue";
import { useStore } from "@/stores/index";

// Import Swiper styles
import "swiper/swiper.scss";

export default defineComponent({
  name: "Home",
  components: { Swiper, SwiperSlide, LottieTest },
  setup() {
    const store = useStore();
    const { name, doubleCounter } = store;
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    const onClick = () => {
      console.log(doubleCounter);

      doubleCounter;
    };
    return {
      onSwiper,
      onSlideChange,
      LottieTest,
      doubleValue: computed(() => store.counter),
      name,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

button.double-count {
  padding: 8px 12px;
  background-color: $system-link;
  color: $black-0;
  border: $white-0 1px solid;
  border-radius: 12px;
}
</style>