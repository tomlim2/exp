<template>
  <main class="page">
    <section>
      <div class="title">On/Offline</div>
      <div class="main">
        Your network is
        <span class="navigator-status" :class="{ onLine: state.isOnline }">{{
          state.isOnline ? "ONLINE" : "OFFLINE"
        }}</span>
      </div>
    </section>
    <section>
      <div class="title">Moment</div>
      <div class="main">
        {{ testMoment() }}
      </div>
      <br />
      <div class="title">Convert number</div>
      <div class="main">
        8900109
        {{ convertNumberForFeed(8900109) }}
      </div>
    </section>
    <section>
      <div class="title">Scroll</div>
      <div class="hi">
        <div class="hihi">
          fefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefefe
        </div>
      </div>
      <div class="hi">
        <div class="hihi2"><div class="hihi21">hi</div></div>
      </div>
    </section>

    <section>
      Loading Test
      <IsLoadingSection />
    </section>
    <section>
      DataPickerVue3Component
      <DatePickerVue3Section />
    </section>
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
        >
          https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask
        </a>
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
import { defineComponent, onMounted, reactive, watch } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import { useCounterStore } from "@/stores/index";
import LottieTest from "@/sections/home/LottiesTest.vue";
import DatePickerVue3Section from "@/sections/etc/DatePickerVue3Section.vue";

// Import Swiper styles
import "swiper/swiper.scss";
import IsLoadingSection from "@/sections/etc/IsLoadingSection.vue";
import moment from "moment";

export default defineComponent({
  name: "Etc",
  components: {
    Swiper,
    SwiperSlide,
    LottieTest,
    DatePickerVue3Section,
    IsLoadingSection,
  },
  setup() {
    const state = reactive({
      isOnline: true,
    });

    onMounted(() => {
      state.isOnline = window.navigator.onLine;
    });

    watch(
      () => window.navigator.onLine,
      () => {
        if (window.navigator.onLine) {
          state.isOnline = true;
        } else {
          state.isOnline = false;
        }
      }
    );

    const convertNumberForFeed = (number: number) => {
      if (number > 999 && number < 1000000) {
        return (number / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
      } else if (number > 1000000) {
        return (number / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
      } else if (number < 900) {
        return number; // if value < 1000, nothing to do
      }
    };

    const testMoment = () => {
      // const sample = "2022-08-12T23:53:39.000Z";
      // const sample2 = "2022-08-10T03:00:00.000Z";
      const sample3 = "2022-08-13T11:57:00.000Z";
      // moment().format("lll");

      const diff = moment(sample3).diff(moment(), "milliseconds");
      const duration = moment.duration(diff);

      const result = `SAMPLE: ${sample3}
      Local: ${moment(sample3).format("lll")} 
      Local Now Formated UTC: ${moment.utc().format(`M D, YYYY h:mm A`)}
      Local Now Formated:  ${moment().format(`M D, YYYY h:mm A`)}
      Day from now: ${moment(sample3).fromNow()}
      Duration: ${duration}
      Duration days: ${Math.abs(duration.days())}
       `;

      return result;
    };

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
          main.randomizeCounter();
          break;

        case "add":
          main.increment();
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
      testMoment,
      convertNumberForFeed,
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

span.navigator-status {
  color: red;

  &.onLine {
    color: green;
  }
}

.main {
  white-space: pre-line;
}

.hi {
  display: flex;

  .hihi {
    width: 100px;
    height: 100px;
    background-color: #00ca85;
    overflow-y: scroll;
    word-break: break-all;
  }
  .hihi2 {
    display: flex;
    width: 100px;
    height: 100px;
    background-color: #313131;

    .hihi21 {
      height: 10vh;
      background-color: #00ca85;
      overflow-y: scroll;
    }
  }
}
.page {
  padding-top: 60px;

  section {
    margin: 32px;
    padding: 32px;
    background-color: rgba($color: #111, $alpha: 1);
  }
}

// date-picker
.date-picker {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 60px;
  background-color: #fff;
  margin: 30px auto;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  user-select: none;
}

.date-picker:hover {
  background-color: #f3f3f3;
}

.date-picker .selected-date {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #313131;
  font-size: 28px;
}

.date-picker .dates {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  background-color: #fff;
}

.date-picker .dates.active {
  display: block;
}

.date-picker .dates .month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eee;
}

.date-picker .dates .month .arrows {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #313131;
  font-size: 20px;
}

.date-picker .dates .month .arrows:hover {
  background-color: #f3f3f3;
}

.date-picker .dates .month .arrows:active {
  background-color: #00ca85;
}

.date-picker .dates .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 200px;
}
.date-picker .dates .days .day {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #313131;
}
.date-picker .dates .days .day.selected {
  background-color: #00ca85;
}
//
button.double-count {
  padding: 8px 12px;
  background-color: $system-link;
  color: $black-0;
  border: $white-0 1px solid;
  border-radius: 12px;
}
</style>