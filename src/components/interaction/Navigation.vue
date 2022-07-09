<template>
  <div class="interaction-nav">
    <div class="interaction-nav-menu-list">
      <div
        class="menu-item"
        :class="{ activated: state.currentSection == 0 }"
        @click="moveTo(0)"
      >
        Copy button
        <div
          class="menu-item-line"
          :class="{ activated: state.currentSection == 0 }"
        />
      </div>
      <div
        class="menu-item"
        :class="{
          activated: state.currentSection > 0 && state.currentSection < 4,
        }"
        @click="moveTo(1)"
      >
        Scroll reacted object
        <div
          class="menu-item-line"
          :class="{
            activated: state.currentSection > 0 && state.currentSection < 4,
          }"
        />
      </div>
      <div
        class="menu-item"
        :class="{ activated: state.currentSection == 4 }"
        @click="moveTo(4)"
      >
        Portal
        <div
          class="menu-item-line"
          :class="{ activated: state.currentSection == 4 }"
        />
      </div>
      <div
        class="menu-item"
        :class="{ activated: state.currentSection == 5 }"
        @click="moveTo(5)"
      >
        IxBtnA
        <div
          class="menu-item-line"
          :class="{ activated: state.currentSection == 5 }"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
export default defineComponent({
  setup() {
    const state: any = reactive({
      currentSection: 0,
    });

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const moveTo = (id: number) => {
      window.scrollTo(0, id * sizes.height);
    };

    onMounted(() => {
      let scrollY: number;
      window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
        state.currentSection = ~~(scrollY / sizes.height);
      });
    });
    return {
      state,
      moveTo,
    };
  },
});
</script>

<style scoped lang="scss">
@import "~@/theme/style.scss";

.interaction-nav {
  position: fixed;
  left: 5rem;
  top: 10rem;
  height: 8px;
  z-index: 998;

  .interaction-nav-menu-list {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .menu-item {
      display: inline-block;
      position: relative;
      color: $white-300;
      @include hover-link-color;

      .menu-item-line {
        position: absolute;
        top: 50%;
        width: 4.5rem;
        height: 2px;
        margin-left: -5rem;
        margin-top: -1px;
        background-color: $black-400;
        transform: scaleX(0);
        transition: 250ms transform ease-out;
        transform-origin: left;
        &.activated {
          transform: scaleX(1);
        }
      }

      &.activated {
        color: $black-400;
        cursor: default;
      }
    }
  }
}
</style>
