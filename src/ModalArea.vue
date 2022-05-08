<template>
  <teleport to="#modal-area">
    <div>Modal1</div>
    <div>Modal2</div>
    <div>Modal3</div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalArea",
  setup() {},
});
</script>