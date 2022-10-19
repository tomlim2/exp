<template>
  <div><v-md-editor v-model="state.text" :mode="mode" height="400px"></v-md-editor></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";

export default defineComponent({
  emits: ["onInput"],
  props: {
    text: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "editable",
    },
  },
  setup(props, { emit }) {
    const state: any = reactive({
      text:"",
    });

    watch(()=>state.text,(text)=>{emit("onInput", text);})

    onMounted(() => {
        state.text = props.text
    });

    return {
      state,
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>

 