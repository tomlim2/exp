<template>
  <Forms />
  <LifeCycle />
  <Counting />
  <MainPlan />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Forms from "./pages/Forms.vue";
import Counting from "./pages/Counting.vue";
import MainPlan from "./pages/MainPlan.vue";
import LifeCycle from "./pages/LifeCycle.vue";

@Options({
  components: {
    Forms,
    MainPlan,
    Counting,
    LifeCycle,
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
