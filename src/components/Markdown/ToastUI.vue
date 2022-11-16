<template>
  <div class="toast-ui" ref="editorRef"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";

import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";

export default defineComponent({
  emits: ["onClick"],
  props: {
    text: {
      type: String,
      default: "",
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "dark",
    },
  },
  setup(props) {
    const state: any = reactive({
      editor: {},
      text: "",
    });

    const editorRef = ref();

    const getMarkdown = () => {
      return state.editor.getMarkdown()
    }

    const setEditor = () => {
      if(!props.isReadOnly){
        state.editor = new Editor({
          el: editorRef.value as HTMLElement,
          height: "500px",
          initialEditType: "wysiwyg",
          previewStyle: "vertical",
          initialValue: props.text,
          theme: props.theme,
        });
      } else {
        state.editor = Editor.factory({
          el: editorRef.value as HTMLElement,
          viewer: true,
        });
        state.editor.setMarkdown(props.text)
      }
    }

    onMounted(() => {
      state.text = props.text;
      setEditor();
    });

    return {
      state,
      props,
      editorRef,
      getMarkdown
    };
  },
});
</script>

<style lang="scss" scoped>
</style>

 