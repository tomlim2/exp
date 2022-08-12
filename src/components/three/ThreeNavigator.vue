<template>
  <aside class="webgl-navigator">
    <div class="nav">
      <router-link to="/webgl/threejs/journey/geometry">Geometry</router-link>
      <router-link to="/webgl/threejs/journey/texture">Texture</router-link>
      <router-link to="/webgl/threejs/journey/material">Material</router-link>
    </div>
  </aside>
</template>

<script lang="ts">
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

      &.router-link-active {
        color: $black-200;
        background-color: $white-300;
        cursor: default;
      }
    }
  }
}
</style>