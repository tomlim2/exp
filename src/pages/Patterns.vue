<template>
  <div class="patterns">
    <PatternSection/>
  </div>
</template>

<script lang="ts">
import PatternSection from "@/sections/patterns/PatternSection.vue";
import { defineComponent } from "vue";


export default defineComponent({
  components: {
    PatternSection
  },
  setup() {
    const state: any = {};

    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";
</style>