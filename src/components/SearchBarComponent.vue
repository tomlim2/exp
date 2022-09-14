<template>
  <div>
    <div class="search-box" :class="{ open: state.isOpen }">
      <input class="search-input" type="text" name="" placeholder="Search" />
      <button class="search-button" @click="onClick('search-toggle')"></button>
    </div>
    <div v-if="state.isOpen" @click="onClick('search-close')" class="dim"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      isOpen: false,
    });

    const onClick = (id: string) => {
      if (id == "search-toggle") {
        state.isOpen = !state.isOpen;
      } else if (id == "search-close") {
        state.isOpen = false;
      }
    };

    return { state, onClick };
  },
});
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  height: 48px;
  border-radius: 48px;
  padding: 0 0 0 20px;
  transition: 150ms background-color ease-in-out;
  z-index: 1000;

  &.open {
    background-color: #dddddd;

    .search-input {
      width: 240px;
      opacity: 1;
    }
  }

  &:hover {
    .search-button {
      background-color: #dddddd;
    }
  }
}

.search-button {
  color: #333333;
  float: right;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 200ms;
  border: none;
  display: flex;
  border-radius: 24px;
  background-color: rgba($color: #000000, $alpha: 0);
  z-index: 1000;

  &::before {
    content: "";
    width: 24px;
    height: 24px;

    background-position: center;
    background-repeat: no-repeat;

    background-image: url("~@/assets/icon/icon-search.svg");
    background-size: 24px;
  }
}

.search-input {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #333333;
  font-size: 16px;
  transition: all 200ms ease-in-out;
  width: 0px;
  opacity: 0;
}

.dim {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 999;
}

@media screen and (max-width: 620px) {
  .search-box:hover > .search-input {
    width: 150px;
    padding: 0 6px;
  }
}
</style>