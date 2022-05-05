<template>
  <header class="header">
    <div class="nav">
      <router-link to="/"> home</router-link> |
      <router-link to="/feeds"> feeds</router-link> |
      <router-link to="/forms"> forms</router-link>
    </div>
  </header>
</template>

<script lang="ts">
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.header {
  padding: 10px 10px;
  text-align: center;
  
  .nav {
    a {
      padding: 5px 15px;
      border-radius: 2px;
      color: $black-200;
      text-decoration: none;

      &.router-link-active {
        background-color: $brand-green-secondary;
      }
    }
  }
}
</style>