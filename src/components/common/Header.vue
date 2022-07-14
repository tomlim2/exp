<template>
  <header class="header">
    <div class="nav">
      <router-link to="/">HOME</router-link> |
      <router-link to="/feeds">FEEDS</router-link> |
      <router-link to="/forms">FORMS</router-link> |
      <router-link to="/etc">etc</router-link>
    </div>
  </header>
</template>

<script lang="ts">
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

      &.router-link-active {
        color: $black-200;
        background-color: $white-300;
        cursor: default;
      }
    }
  }
}
</style>