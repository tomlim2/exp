<template>
  <div class="block" v-if="showBlock">click me</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LifeCycle",
  components: {},
  props: { delay: { type: Number, default: 0 } },
  data() {
    return {
      showBlock: false,
    };
  },
  mounted() {
    console.log("component mounted");
    setTimeout(() => {
      this.showBlock = true;
    }, this.delay);
  },
  updated() {},
});
</script>