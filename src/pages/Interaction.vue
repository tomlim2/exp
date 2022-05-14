<template>
  <div class="interaction-page">
    <IxBtnA />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IxBtnA from "@/sections/Interaction/IxBtnA.vue";

export default defineComponent({
  components: { IxBtnA },
  setup() {
    const state: any = {};

    return { state };
  },
});
</script>

