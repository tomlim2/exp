<template>
  <Chart />
  <CryptoMarket />
  <Snaps/>
  <Screener/>
</template>

<script lang="ts">
import { Chart,CryptoMarket, Snaps, Screener } from 'vue-tradingview-widgets';
import { defineComponent } from "vue";

export default defineComponent({
  name: 'App',
  components: {
    Chart,
    CryptoMarket,
    Screener,
    Snaps,
  },
});
</script>