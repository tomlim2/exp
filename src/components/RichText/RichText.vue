<template>
  <div class="rich-text">
    <p v-for="(textDetails, index) in state.textDetailsList" :key="index">
      <span 
        v-for="(textDetail) in textDetails"
        :key="textDetail.startIndexInAllText" 
        :class="[{
          hashTag: textDetail.type == 'hashTag',
          url: textDetail.type == 'url',
          mention: textDetail.type == 'mention' && textDetail.url,
        }, 
        `${textDetail.type}-${textDetail.startIndexInAllText}`]"
        @click="navigateTo(textDetail.type, textDetail.url)"
        >
        {{textDetail.text.replace(/\s/g, '&nbsp;')}}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { linkDetailsList, TextItemDetailsList } from "./RichText";

interface RichTextState {
  textDetailsList: TextItemDetailsList;
}

export default defineComponent({
  components: {},
  props: {
    contentsText: {
      type: String,
      default: "",
    },
    mentionList:{
      type: Array,
      default: () => []
    }
  },
  emits: [],
  setup(props) {
    const router = useRouter()
    const state: RichTextState = reactive({
      textDetailsList: []
    });

    const navigateTo = (tagType: string, url: string) =>{
      switch (tagType) {
        case "url":
          window.open(url, '_blank');
          break;

        case "hashTag":
          break;
        
        case "mention":
          router.push(url);
          break;

        default:
      }
    }

    onMounted(() => {
      if(props.contentsText){
        state.textDetailsList = linkDetailsList(props.contentsText, props.mentionList);
      }
    });

    watch(
      ()=>props.contentsText,
      ()=>{
        state.textDetailsList = linkDetailsList(props.contentsText, props.mentionList);
      })



    return {
      state,
      navigateTo
    };
  },
});
</script>

<style lang="scss" scoped>
  .rich-text {
    p {
      min-height: 20px;
      min-width: 1px;
      line-break: anywhere;
    }
    span {
      font-size: 14px;
      line-height: 20px;

      &.hashTag {
        background-color: white;
        color: purple;
        cursor: pointer;

        &:hover{
          opacity: .75;
        }
      }

      &.url {
        background-color: blue;
        color: white;
        cursor: pointer;

        &:hover{
          opacity: .75;
        }
      }

      &.mention {
        background-color: red;
        color: white;
        cursor: pointer;

        &:hover{
          opacity: .75;
        }
      }
    }

    .blank{
      height: 100px;
      width: 100px;
    }
  }
</style>