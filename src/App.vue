<template>
  <Header />
  <router-view />
  <ModalArea />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Global/Header.vue";
import ModalArea from "@/ModalArea.vue";

export default defineComponent({
  components: { Header, ModalArea },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
