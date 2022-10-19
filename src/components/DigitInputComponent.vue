<template>
  <div id="digit-input-component" class="digit-input-component">
    <input
      ref="digitInputRefs"
      class="digit-input-area"
      type="password"
      :maxlength="numberOfDigits"
      @value="state.userInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      pattern="\d*"
    />
    <div class="digits">
      <div
        class="digit"
        :class="{ hadDigit: state.userInput.length > index }"
        v-for="(digit, index) in numberOfDigits"
        :key="index"
        @click="onClick('digit')"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  emits: ["onInputDigits"],
  components: {},
  props: {
    numberOfDigits: {
      type: Number,
      default: 4,
    },
    userInput: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const state: any = reactive({
      userInput: "",
      isFocused: false,
    });
    const digitInputRefs = ref();

    const onClick = (id: string) => {
      if (id === "digit") {
        (digitInputRefs.value as any).focus();
      }
    };

    const onFocus = () => {
      state.isFocused = true;
    };

    const onBlur = () => {
      state.isFocused = false;
    };

    const onInput = (event: any) => {
      const digits = event.target.value;

      state.userInput = digits;

      emit("onInputDigits", {digits: state.userInput});
    };

    return {
      state,
      onClick,
      onInput,
      onFocus,
      onBlur,
      digitInputRefs,
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.digit-input-component {
  position: relative;

  .digit-input-area {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    cursor: default;
  }

  .digits {
    display: flex;
    gap: 4px;

    .digit {
      position: relative;
      background-color: #dddddd;
      width: 30px;
      height: 30px;
      border-radius: 15px;

      overflow: hidden;

      cursor: text;

      &.hadDigit {
        background-color: #252525;
      }

      .activated {
        width: 100%;
        height: 100%;
        background-color: purple;
      }
    }
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>