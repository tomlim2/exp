<template>
  <div class="otherside-button-wrapper">
    <div
      @mousemove="onMousemove"
      @mouseenter="onMouseenter"
      @mouseout="onMouseout"
      class="hihihi"
    ></div>
    <div
      class="otherside-button"
      :style="`
      background: linear-gradient(135.89deg, rgba(185, 102, 123, 0.3) -5.87%, rgba(9, 27, 32, 0.3) 53.43%), rgb(16, 16, 16);
      will-change: transform;
      transition: all 1200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;
      ${state.tiltButton}
        `"
    >
      <div class="content-wrapper">
        <div class="image-wrapper">
          <img src="@/assets/icon/icon-tech-1.svg" alt="icon-svg" />
        </div>
        <div class="text-wrapper">Hey, You</div>
      </div>
      <br />
      <div class="glare-wrapper">
        <div :style="state.glareButton" class="glare"></div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onUnmounted, reactive } from "vue";

export default defineComponent({
  setup() {
    const state: any = reactive({
      buttonPosX: 0,
      buttonPosY: 0,
      mouseX: 0,
      mouseY: 0,
      test: "hi",
      tiltButton:
        "transform: perspective(3000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glareButton: "opacity: 0",
    });

    const tiltButton = (e: any) => {
      const boxPosition = e.target.getBoundingClientRect();

      state.buttonPosX = boxPosition.left;
      state.buttonPosY = boxPosition.top;
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      const mousePosXOnButton = state.mouseX - state.buttonPosX;
      const mousePosYOnButton = state.mouseY - state.buttonPosY;

      const tiltButtonX = 15 - (mousePosYOnButton / 300) * 30;
      const tiltButtonY = -15 + (mousePosXOnButton / 300) * 30;

      state.tiltButton = `transform: perspective(3000px) rotateX(${tiltButtonX}deg) rotateY(${tiltButtonY}deg) scale3d(1, 1, 1)`;
      state.glareButton = `opacity: 0`;
    };

    const glare = (e: any) => {
      const boxPosition = e.target.getBoundingClientRect();

      state.buttonPosX = boxPosition.left;
      state.buttonPosY = boxPosition.top;
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      const mousePosXOnButton = state.mouseX - state.buttonPosX;
      const mousePosYOnButton = state.mouseY - state.buttonPosY;

      const intoAxisX = mousePosXOnButton - 150;
      const intoAxisY = mousePosYOnButton - 150;

      const lineLengthTowardCenter = Math.sqrt(
        Math.pow(intoAxisX, 2) + Math.pow(intoAxisY, 2)
      );

      let opacityChange = (lineLengthTowardCenter / 150) * 0.8;

      if (opacityChange > 0.8) {
        opacityChange = 0.8;
      }

      state.glareButton = `opacity: ${opacityChange}; transform: rotate(${lineLengthTowardCenter}deg) translate(-50%, -50%);`;
    };

    const onMousemove = (e: any) => {
      tiltButton(e);
      glare(e);
    };

    const onMouseenter = (e: any) => {
      tiltButton(e);
      glare(e);
    };

    const onMouseout = () => {
      state.tiltButton =
        "transform: perspective(3000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

      state.glareButton = `opacity: 0; transform: rotate(0deg) translate(-50%, -50%);`;
    };

    onUnmounted(() => {});

    return { state, onMousemove, onMouseenter, onMouseout };
  },
});
</script>

<style lang="scss" scoped>
.otherside-button-wrapper {
  position: relative;
  width: 300px;
  height: 300px;

  .hihihi {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 12;
  }
  .otherside-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: black;
    color: white;

    transform-style: preserve-3d;

    &::before {
      content: "";
      position: absolute;
      left: 2px;
      top: 2px;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border-radius: 12px;
      background-color: black;
    }

    .content-wrapper {
      transform: translateZ(60px);
      text-align: center;

      .image-wrapper {
        transition: all 1200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;
      }

      .text-wrapper{
        position: relative;
        z-index: 10;
      }
    }

    .glare-wrapper {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 18px;
      -webkit-mask-image: -webkit-radial-gradient(center, white, black);

      .glare {
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: 0% 0%;
        pointer-events: none;
        width: 544.885px;
        height: 544.885px;
        transform: rotate(0deg) translate(-50%, -50%);
        opacity: 1;
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(185, 102, 123, 0.3) 100%
        );
        transition: opacity 1200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;
      }
    }
  }
}
</style>

