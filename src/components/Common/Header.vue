<template>
  <header class="header">
    <div class="nav">
      <router-link to="/">home</router-link> |
      <router-link to="/feeds">feeds</router-link> |
      <router-link to="/forms">forms</router-link>
      <router-link to="/interaction">interaction</router-link>
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
  

  .nav {
    a {
      padding: 5px 15px;
      border-radius: 2px;
      color: $white-100;
      text-decoration: none;

      &.router-link-active {
        color: $black-300;
        background-color: $white-300;
      }
    }
  }
}
</style>