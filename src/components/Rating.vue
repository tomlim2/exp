<template>
  <h2>Rating</h2>
  <ul>
    <li :class="{ active: props.modelValue === 'poor' }">
      <button type="button" @click="activate('poor')">poor</button>
    </li>
    <li :class="{ active: props.modelValue === 'average' }">
      <button type="button" @click="activate('average')">average</button>
    </li>
    <li :class="{ active: props.modelValue === 'great' }">
      <button type="button" @click="activate('great')">great</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emit: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const activate = (option: String) => {
      console.log(option);
      emit("update:modelValue", option);
    };

    return {
      props,
      activate,
    };
  },
});
</script>

<style scoped>
</style>
