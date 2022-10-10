<template>
  <div class="embed-player-component">
    <div>
      <button class="copy-btn" @click="onClick">https://www.youtube.com/watch?v=n9ZNGVvMOSQ</button> 
      <br>
      <button class="copy-btn" @click="onClick">https://youtu.be/sw-o790XD2w</button> 
      <br>
      <button class="copy-btn" @click="onClick">https://vimeo.com/76979871</button>
      <br>
      <button class="copy-btn" @click="onClick">https://gfycat.com/honesthomelygoldfish</button>
      <br>
      <button class="copy-btn" @click="onClick">https://coub.com/view/38b8n0</button>
      <br>
      <button class="copy-btn" @click="onClick">https://dai.ly/x8e70bk</button>
    </div>
    <form @submit="onSubmit" class="input-area">
      <input class="input" ref="inputArea" v-model="state.userInput" @focus="selectAllCharacter" type="text"> 
      <button >Embed</button>
    </form>
    <div class="preview" :key="state.userInput">
      userUnput: {{state.userInput}}
      <br>
      videoUrl: {{state.userInput}}
    </div>
    <br>
    <div class="embed-player-wrapper">
      <EmbedPlayer :videoUrl="state.videoUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import EmbedPlayer from "./EmbedPlayer.vue";
import { copyByClick } from "@/libs/utils"

export default defineComponent({
  components: { EmbedPlayer },
  props:{
  },
  setup() {
    const state = reactive({
      videoUrl:"",
      userInput:""
    })

    const inputArea = ref()

    const onSubmit = (event: any) => {
      event.preventDefault()
      state.videoUrl = state.userInput;
    }

    const onClick = (event: any) => {
      copyByClick(event.target.innerText);
      inputArea.value.focus()
    }

    const selectAllCharacter = (event:any) => {
      event.target.setSelectionRange(0, state.userInput.length)
    }

    return { 
        state, 
        onClick, 
        onSubmit,
        selectAllCharacter,
        inputArea
    };
  }
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

    .input{
      padding: 0 5px; 
      
      &:focus {
        outline-width: 2px;
        outline-color: black;
      }
    }

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

  .embed-player-wrapper{
    width: 800px;
  }
}
</style>