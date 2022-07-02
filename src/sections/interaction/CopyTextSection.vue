<template>
  <div class="copy-text-section">
    <div class="copy-text">Copy <span class="allow-to-copy">ONE</span></div>
    <div class="copy-text">Copy <span class="allow-to-copy">TWO</span></div>
    <div class="copy-text">Copy <span class="allow-to-copy">THREE</span></div>
    <div class="copy-text">Copy <span class="allow-to-copy">FOUR</span></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";


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
});
</script>

<style lang="scss" scoped>
@import "~@/theme/style.scss";

.copy-text-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100vw;
  height: 90vh;
  background-color: $black-0;
  color: #fff;
  z-index: 1;

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
      text-shadow: red -2px -1px, cyan 2px 1px;
      cursor: pointer;
    }
  }
}
</style>