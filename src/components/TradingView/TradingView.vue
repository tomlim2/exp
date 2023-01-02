<template>
  <div class="trading-view">
    <Chart class="box" />
    <CryptoMarket class="box" />
    <Snaps class="box" />
    <Screener class="box" />
  </div>
</template>

<script lang="ts">
import { Chart, CryptoMarket, Snaps, Screener } from "vue-tradingview-widgets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    Chart,
    CryptoMarket,
    Screener,
    Snaps,
  },
});
</script>

<style lang='scss'>
.trading-view {
  width: 100%;
}
</style>