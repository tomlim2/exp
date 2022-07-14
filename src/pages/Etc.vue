<template>
  <main class="page">
    <section>
      store.name: {{ main.name }}
      <br />
      store.counter: {{ main.counter }} ||
      <br />
      doubleValue:
      <br />
      <button class="double-count" @click="onClick('random')">
        random count
      </button>
      <button class="double-count" @click="onClick('add')">
        increment count
      </button>
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
import { defineComponent, onMounted } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import LottieTest from "@/sections/home/LottiesTest.vue";
import { useCounterStore } from "@/stores/index";

// Import Swiper styles
import "swiper/swiper.scss";

export default defineComponent({
  name: "Etc",
  components: { Swiper, SwiperSlide, LottieTest },
  setup() {
    const main = useCounterStore();

    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };

    const onSlideChange = () => {
      console.log("slide change");
    };

    const onClick = (id: string) => {
      switch (id) {
        case "random":
          main.randomizeCounter()
          break;

        case "add":
          main.increment()
          break;
      }
    };

    onMounted(() => {
      console.log(main.counter);
    });

    return {
      onSwiper,
      onSlideChange,
      LottieTest,
      onClick,
      main,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";
.page {
  padding-top: 60px;
}
button.double-count {
  padding: 8px 12px;
  background-color: $system-link;
  color: $black-0;
  border: $white-0 1px solid;
  border-radius: 12px;
}
</style>