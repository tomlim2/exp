<template>
  <header class="header">
    <div class="nav">
      <a :class="{ selected: state.route == '' }" href="/">HOME</a> |
      <a :class="{ selected: state.route == 'webgl' }" href="/webgl">Three</a> |
      <a :class="{ selected: state.route == 'forms' }" href="/forms">FORMS</a> |
      <a :class="{ selected: state.route == 'etc' }" href="/etc">etc</a>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue-demi";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const state = reactive({
      route: computed(() => route.fullPath.split("/")[1]),
    });
    return { state };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 56px;
  padding: 10px 10px;
  text-align: center;
  z-index: 999;

  .nav {
    a {
      padding: 5px 15px;
      border-radius: 2px;
      color: $black-400;
      text-decoration: none;

      @include hover-link-color;

      &.selected {
        color: $white-200;
        background-color: $black-200;
      }
    }
  }
}
</style>