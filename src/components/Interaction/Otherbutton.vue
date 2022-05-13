<template>
  <div
    ref="myBox"
    class="otherside-button box"
    :style="`
      background: linear-gradient(135.89deg, rgba(42, 165, 113, 0.3) -5.87%, rgba(38, 26, 78, 0.3) 53.43%), rgb(16, 16, 16);
      will-change: transform;
      transition: all 1200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;
        `"
  >
    <p>Move the mouse around in this box to watch its coordinates change.</p>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  setup() {
    const state: any = {
      xPos: 0,
      yPos: 0,
    };

    const myBox = ref();

    onMounted(() => {
      const box = document.querySelector(".box") as HTMLDivElement;

      const boxOffsetY = myBox.value.getBoundingClientRect().top;
      const boxOffsetX = myBox.value.getBoundingClientRect().left;

      function updateDisplay(event: any) {
        state.xPos = event.clientX - boxOffsetX;
        state.yPos = event.clientY - boxOffsetY;

        myBox.value.style.transform = `perspective(3000px) rotateX(${
          10 - (state.yPos / 300) * 20
        }deg) rotateY(${-10 + (state.xPos / 300) * 20}deg) scale3d(1, 1, 1)`;
      }

      function resetPos() {
        myBox.value.style.transform = `perspective(3000px) rotateX(${0}deg) rotateY(${0}deg) scale3d(1, 1, 1)`;
      }

      box.addEventListener("mousemove", updateDisplay, false);
      box.addEventListener("mouseenter", updateDisplay, false);
      box.addEventListener("mouseleave", resetPos, false);
    });

    onUnmounted(() => {});

    return { state, myBox };
  },
});
</script>

<style lang="scss" scoped>
.otherside-button {
  display: block;
  width: 300px;
  height: 300px;
  border-radius: 12px;
  background-color: black;
  color: white;
}
</style>

