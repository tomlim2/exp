<template>
  <div>
    <MdEditor
      v-model="state.text"
      :toolbars="toolbars"
      :theme="theme"
      :footers="footers"
      :previewOnly="isPreviewOnly"
      @onChange="onChange"
      language="en-US"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  components: { MdEditor },
  emits: ["onChange"],
  props: {
    text: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "editable",
    },
    isPreviewOnly: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "dark",
    },
  },
  setup(props, { emit }) {
    const state: any = reactive({
      text: "",
    });
    const toolbars = [
      "bold",
      "underline",
      "italic",
      "-",
      "title",
      "strikeThrough",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "-",
      "codeRow",
      "code",
      "link",
      "image",
      "table",
      "=",
      "preview",
      "htmlPreview",
      "catalog",
    ];

    const footers = [""];

    const onChange = (text: string) => {
      emit("onChange", text);
    };

    onMounted(() => {
      state.text = props.text;
    });

    watch(
      () => props.text,
      (text) => (state.text = text)
    );

    return {
      state,
      props,
      toolbars,
      footers,
      onChange,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>

 