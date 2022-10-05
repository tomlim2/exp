<template>
  <div class="embed-player-component">
    <div>
      <button class="copy-btn" @click="onClick">https://www.youtube.com/watch?v=n9ZNGVvMOSQ</button> 
      <br>
      <button class="copy-btn" @click="onClick">https://vimeo.com/76979871</button>
      <br>
      <button class="copy-btn" @click="onClick">https://gfycat.com/honesthomelygoldfish</button>
      <br>
      <button class="copy-btn" @click="onClick">https://coub.com/view/38b8n0</button>
    </div>
    <div class="input-area">
      <input v-model="state.userInput" type="text"> 
      <button @click="onSubmit">Embed</button>
    </div>
    <div class="preview" :key="state.userInput">
      userUnput: {{state.userInput}}
      <br>
      videoUrl: {{state.userInput}}
    </div>
    <br>
    <EmbedPlayer :videoUrl="state.videoUrl" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import EmbedPlayer from "./EmbedPlayer.vue";

export default defineComponent({
  components: { EmbedPlayer },
  props:{
  },
  setup() {
    const state = reactive({
      videoUrl:"",
      userInput:""
  })
    
    
  const onSubmit = () => {
      state.videoUrl = state.userInput;
  }

  const onClick = (event:any) => {
   copyByClick(event.target.innerText);
  }

  const copyByClick = ( textToCopy: string) => {

    copyTextToClipboard(textToCopy)

    const fallbackCopyTextToClipboard = (text:string) => {
      let textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        alert('Copied ' + msg);
      } catch (err) {
        alert('Fallback: Oops, unable to copy ' + err);
      }

      document.body.removeChild(textArea);
    }

    function copyTextToClipboard(text: string) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function() {
        alert('Copied!');
      }, function(err) {
        alert('Fallback: Oops, unable to copy ' + err);
      });
    }
  }

    return { state, onClick, onSubmit };
  },
});
</script>

<style lang="scss" scoped>
.embed-player-component {
  .preview{
    color: aliceblue;
  }
  .input-area{
    padding: 20px 0;
    display: flex;
    gap: 5px;

    button{
      padding: 5px 10px;
      cursor: pointer;
    }
  }
  .copy-btn{

    cursor: pointer;

    &:hover{
      background-color: #ddd;
    }
  }
}
</style>