<template>
  <div>{{ state.counter }} sec</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";

export default defineComponent({
  name: "Counting",
  components: {},
  props:{},
  setup() {
    const state = reactive({
      counter: "" as number | string,
    });
    onMounted(() => {
      const FESTART_DAY: string = "2021-10-03";
      const FESTART_DAY_DATE: Date = new Date(FESTART_DAY);
      const intlNumberFormatter = new Intl.NumberFormat("en-US");

      setInterval(() => {
        const now = new Date();
        const difference: number = Math.floor(
          (now.getTime() - FESTART_DAY_DATE.getTime()) / 1000
        );
        state.counter = intlNumberFormatter.format(difference);
      }, 1000);
    });
    return {
      state,
    };
  },
});
</script>