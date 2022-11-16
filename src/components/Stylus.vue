<template>
  <div>
    <p class="blue_text">{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const state = {};
    const msg = "hello world";

    return { msg, state };
  },
});
</script>
