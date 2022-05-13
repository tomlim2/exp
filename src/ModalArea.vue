<template>
  <teleport to="#modal-area">
    <div v-if="false">Modal1</div>
    <div v-if="false">Modal2</div>
    <div v-if="false">Modal3</div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalArea",
  setup() {},
});
</script>