<template>
  <ToastUI ref="toastUIRef" :isReadOnly="false" theme="light" :text="state.text" />
  <BasicButton text="Hot issue" @onClick="onClick" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import ToastUI from "@/components/Markdown/ToastUI.vue"
import BasicButton from "../BasicButton.vue";

export default defineComponent({
  components: { ToastUI, BasicButton },
  props: {
    text: {
      type: String,
      default: "Button",
    },
  },
  setup(props) {
    const state: any = reactive({
      text: "## hihihi",
    });

    const toastUIRef = ref()

    const onClick = () => {
      console.log(toastUIRef.value.getMarkdown());
    };

    onMounted(() => {});

    return {
      state,
      props,
      onClick,
      toastUIRef
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

  &:hover {
    opacity: 0.75;
  }
}
</style>