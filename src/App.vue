<template>
  <Counting />
  <MainPlan />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Counting from "./pages/Counting.vue";
import MainPlan from "./pages/MainPlan.vue";

@Options({
  components: {
    MainPlan,
    Counting,
  },
})
export default class App extends Vue {}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
