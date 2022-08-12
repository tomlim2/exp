<template>
  <button class="components-loading-btn" :disabled="disabled">
    {{ isLoading ? "" : title }}
    <span class="loader" v-if="isLoading"></span>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.components-loading-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;

    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 2px solid #000;
      animation: prixClipFix 2s linear infinite;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
