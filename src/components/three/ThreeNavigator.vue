<template>
  <aside class="webgl-navigator">
    <div class="nav">
      <a
        v-for="(route, index) in routerList"
        :key="index"
        :class="{
          selected:
            state.route == route.name.replace('Threejs', '').toLowerCase(),
        }"
        :href="'/webgl/' + route.path"
        >{{ route.name.replace("Threejs", "") }}</a
      >
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue-demi";
import { useRoute } from "vue-router";
import { route as routeList } from "@/router/index";

export default defineComponent({
  setup() {
    const route = useRoute();
    const state = reactive({
      route: computed(() => route.fullPath.split("/")[4]),
    });

    const routerList: any = routeList[0].children[1].children;

    return { state, routerList };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.webgl-navigator {
  position: fixed;
  top: 10vh;
  left: 0;
  z-index: 999;

  .nav {
    display: flex;
    flex-direction: column;
    gap: 8px;

    a {
      padding: 4px 16px 4px 64px;
      border-radius: 2px;
      color: $black-400;
      text-decoration: none;

      @include hover-link-color;

      &.selected {
        color: $black-200;
        background-color: $white-300;
        cursor: default;
      }
    }
  }
}
</style>