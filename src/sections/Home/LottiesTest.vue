<template>
  <div>
    <h2>Lottie Test</h2>
    <Vue3Lottie :animationData="AstronautJSON" :height="200" :width="200" />
  </div>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";

const AstronautJSON = require("@/sections/Home/lottie-anmation-dark.json");

export default {
  components: {
    Vue3Lottie,
  },
  setup() {
    return { AstronautJSON };
  },
};
</script>