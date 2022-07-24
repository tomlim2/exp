<template>
  <div class="copy-text-section">
    <div class="buttons-wrapper">
      <div class="copy-text">Copy <span class="allow-to-copy">ONE</span></div>
      <div class="copy-text">Copy <span class="allow-to-copy">TWO</span></div>
      <div class="copy-text">Copy <span class="allow-to-copy">THREE</span></div>
      <div class="copy-text">Copy <span class="allow-to-copy">FOUR</span></div>
    </div>
    <SpinningStarComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SpinningStarComponent from "@/components/interaction/SpinningStarComponent.vue";

export default defineComponent({
  setup() {
    const state: any = {};
    onMounted(() => {
      const targetElements = document.getElementsByClassName("allow-to-copy");
      for (let index = 0; index < targetElements.length; index++) {
        const singleElement = targetElements[index] as HTMLElement;
        singleElement.onclick = function () {
          document.execCommand("copy");
        };
        singleElement.addEventListener("copy", function (event) {
          event.preventDefault();
          if (event.clipboardData) {
            event.clipboardData.setData(
              "text/plain",
              singleElement.textContent as any
            );
            alert(event.clipboardData.getData("text"));
          }
        });
      }
    });
    return { state };
  },
  components: { SpinningStarComponent },
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.copy-text-section {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: $black-0;
  color: $white-300;
  
  overflow: hidden;

  .buttons-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    position: relative;
    z-index: 10;
  }

  .copy-text {
    padding: 16px 64px;
    background-color: inherit;
    border: none;
    font-size: 2rem;
    color: $white-0;
    background-color: $black-0;
    border: 1px solid $black-400;
    border-radius: 15px;
    transition: 150ms text-shadow ease-in-out;
    cursor: pointer;

    &:hover {
      text-shadow: $chart-negative-primary -2px -1px, $system-link 2px 1px;
      cursor: pointer;
    }
  }
}
</style>