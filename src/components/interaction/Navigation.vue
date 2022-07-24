<template>
  <div class="interaction-nav">
    <div class="interaction-page-max-length">
      <div class="interaction-page-length-line" ref="pageLengthLine" />
    </div>
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
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
    setup() {
        const state: any = reactive({
            currentSection: 0,
        });
        const pageLengthLine = ref();
        const rotatingTypo = ref();
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        const moveTo = (id: number) => {
            window.scrollTo({ top: id * sizes.height, left: 0, behavior: "smooth" });
        };
        onMounted(() => {
            let scrollY: number;
            
            window.addEventListener("scroll", () => {
              window.innerWidth;
                scrollY = window.scrollY;
              state.currentSection = ~~(scrollY / sizes.height);
                pageLengthLine.value.style.width =
                    (window.scrollY * window.innerWidth) /
                        (document.documentElement.scrollHeight - window.innerHeight) +
                        "px";
                
            });
        });
        return {
            state,
            moveTo,
            pageLengthLine,
            rotatingTypo,
        };
    },
    
});
</script>

<style scoped lang="scss">
@import "~@/theme/style.scss";

.interaction-nav {
  position: fixed;
  left: 0;
  top: 10rem;
  z-index: 998;
  .interaction-page-max-length {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 8px;
    background-color: $black-400;

    .interaction-page-length-line {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 8px;
      background-color: $white-300;
    }
  }
  .interaction-nav-menu-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-left: 6rem;

    .menu-item {
      display: inline-block;
      position: relative;
      color: $black-400;
      @include hover-link-color;

      .menu-item-line {
        position: absolute;
        top: 50%;
        width: 4.5rem;
        height: 2px;
        margin-left: -6rem;
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
        color: $white-300;
        cursor: default;
      }
    }
  }
}
</style>
