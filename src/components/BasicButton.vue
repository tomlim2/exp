<template>
  <button class="basic-button" @click="onClick">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  emits: ["onClick"],
  props: {
    text: {
      type: String,
      default: "Button",
    },
  },
  setup(props, { emit }) {
    const state: any = reactive({
      userInput: [],
    });

    const onClick = () => {
      emit("onClick");
    };

    onMounted(() => {});

    return {
      state,
      props,
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.basic-button {
  padding: 8px 20px;
  background: #252525;
  border: none;
  border-radius: 8px;
  color: #dadada;
  font-size: 1rem;

  cursor: pointer;

  transition: opacity 150ms ease-in-out;

  &:hover{
    opacity: .75;
  }
}
</style>