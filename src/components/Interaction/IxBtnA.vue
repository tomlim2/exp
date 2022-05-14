<template>
  <div class="sticky-3d-button-wrapper">
    <div
      @mousemove="onMousemove"
      @mouseenter="onMouseenter"
      @mouseout="onMouseout"
      class="sticky-3d-event"
    />
    <div class="sticky-3d-button" :style="styles.tiltButton">
      <div class="content-wrapper">
        <div class="image-wrapper">
          <img src="@/assets/icon/icon-tech-1.svg" alt="icon-svg" />
        </div>
        <div class="text-wrapper">
          <h2>{{ title }}</h2>
          <p>{{ description }}</p>
        </div>
      </div>
      <br />
      <div class="glare-wrapper">
        <div :style="styles.glareButton" class="glare"></div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default:
        "",
    },
    borderGradient: {
      type: String,
      default:
        "linear-gradient(135.89deg, rgba(185, 102, 123, 0.3) -5.87%, rgba(9, 27, 32, 0.3) 53.43%), rgb(16, 16, 16)",
    },
    glare: {
      type: String,
      default:
        "linear-gradient(0deg,rgba(255, 255, 255, 0) 0%,rgba(185, 102, 123, 0.3) 100%)",
    },
  },
  setup(props) {
    const state: any = reactive({
      buttonPosX: 0,
      buttonPosY: 0,
      mouseX: 0,
      mouseY: 0,
    });

    const styles: any = reactive({
      borderColor: computed(() => `background: ${props.borderGradient}`),
      tiltButton:
        "transform: perspective(3000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      tiltButtonStyle: computed(() => styles.tiltButton + styles.borderColor),
      glareButton: "opacity: 0",
    });

    const tiltButton = (e: any) => {
      const boxPosition = e.target.getBoundingClientRect();

      const mousePosXOnButton = e.clientX - boxPosition.left;
      const mousePosYOnButton = e.clientY - boxPosition.top;

      //tilting button

      const tiltButtonX = 15 - (mousePosYOnButton / 300) * 30;
      const tiltButtonY = -15 + (mousePosXOnButton / 300) * 30;

      styles.tiltButton = `transform: perspective(3000px) rotateX(${tiltButtonX}deg) rotateY(${tiltButtonY}deg) scale3d(1, 1, 1)`;

      const intoAxisX = mousePosXOnButton - 150;
      const intoAxisY = mousePosYOnButton - 150;

      const lineLengthTowardCenter = Math.sqrt(
        Math.pow(intoAxisX, 2) + Math.pow(intoAxisY, 2)
      );

      let opacityChange = (lineLengthTowardCenter / 150) * 0.8;

      if (opacityChange > 0.8) {
        opacityChange = 0.8;
      }

      styles.glareButton = `opacity: ${opacityChange}; transform: rotate(${lineLengthTowardCenter}deg) translate(-50%, -50%);`;
    };

    const onMousemove = (e: any) => {
      tiltButton(e);
    };

    const onMouseenter = (e: any) => {
      tiltButton(e);
    };

    const onMouseout = () => {
      styles.tiltButton =
        "transform: perspective(3000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

      styles.glareButton = `opacity: 0; transform: rotate(0deg) translate(-50%, -50%);`;
    };

    return { styles, state, props, onMousemove, onMouseenter, onMouseout };
  },
});
</script>

<style lang="scss" scoped>
.sticky-3d-button-wrapper {
  position: relative;
  width: 300px;
  height: 300px;

  .sticky-3d-event {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 12;
  }
  .sticky-3d-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: v-bind(borderGradient);
    will-change: transform;
    transform-style: preserve-3d;
    transition: all 1200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;

    &::before {
      content: "";
      position: absolute;
      left: 1px;
      top: 1px;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border-radius: 12px;
      background-color: #000;
    }

    .content-wrapper {
      transform: translateZ(60px);
      text-align: center;

      .image-wrapper {
        transition: all 1200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;
      }

      .text-wrapper {
        position: relative;
        padding: 0 40px;
        z-index: 10;

        color: #fff;

        h2 {
          margin: 8px 0 0 0;
          padding: 0;
        }

        p {
          margin: 8px 0 0 0;
          opacity: 0.4;
        }
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
        background: v-bind(glare);
        transition: opacity 1200ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s;
      }
    }
  }
}
</style>

