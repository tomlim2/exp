<template>
  <div class="docs">
    <div>
    <h1 class="title">{{ state.title }}</h1>
    <div class="description" v-html="state.description" />
    <h1>RichTextInputArea</h1>
    <br>
    <RichTextInputArea 
      class="rich-text-area" 
      :tagListInSearch="state.tagListInSearch" 
      @onTextInput='onTextInput' 
      @onTagInSearch='onTagInSearch'
    />
    <br>
    <br><br>
    <h1>Where to post</h1>
    <br>
    <RichText :contentsText="state.gotText" class="rich-text"/>
    <br>
    <h1>Search by hashtag (Check console log) </h1>
    <br>
    <div style="display: flex">
      <input class="temp" type="text" :value='state.searchKeyword' @input='onSearchKeywordInput'>
      <button class="submit" @click="onClick">
        Get ({{state.searchKeyword}})
      </button>
    </div>
    </div>

  </div>
</template>

<script lang="ts">
import RichTextInputArea from "@/components/RichText/RichTextInputArea.vue";
import RichText from "@/components/RichText/RichText.vue";

import { defineComponent, onMounted, reactive } from "vue";
import { TextItemDetail, linkDetails, searchResult } from '@/components/RichText/RichText'

export default defineComponent({
  components: {RichTextInputArea, RichText},
  props: {},
  emits: [],
  setup() {
    const state: any = reactive({
      tagListInSearch:[],
      rawText: "",
      gotText: "",
      searchingKeyword: "",
      hasKeywordMatched: false,
      searchKeyword:''
    });

    const onSearchKeywordInput = (event: any) => {
      state.searchKeyword = event.target.value
    }

    const onTextInput = ( rawText: string )=>{
      state.rawText = rawText; 
    }

    const onTagInSearch = ( keyword: TextItemDetail )=>{
      const word = keyword.text.slice(1,keyword.length)
      const type = keyword.type
      state.searchingKeyword = word;

      searchTagKeyword( type, word )
    }

    const searchTagKeyword = async ( tagType: string, text: string ) => {
      if(text){
        if(tagType == "hashTag"){
          // const result = await model.Tags.getHashTagsForSearching(text);
          const dummyList = [{tag: 'hi', count: 10}, {tag:'why', count:10}, {tag:'slow', count:10}]
          const result = searchResult(text, dummyList);
          
          if(result.tags){
            state.tagListInSearch = result.tags;
          } else {
            state.tagListInSearch = []
          }
        } else if(tagType == "mention"){
          // const result = await model.Tags.getMentionsForSearching(text);
          const dummyList = [{tag: 'johnson', count: 10}, {tag:'amy', count: 30}, {tag:'야근', count: 10}];
          const result = searchResult(text, dummyList);

          if(result.mentions){
            state.tagListInSearch = result.mentions;
          } else {
            state.tagListInSearch = []
          }
        }        
      } else {
        state.tagListInSearch = []
      }
    }

    onMounted(()=>{
      window.scrollTo(0, 0)
    })

    return {
      state,
      onSearchKeywordInput,
      onTextInput,
      onTagInSearch,
    };
  },
});
</script>

<style lang="scss">
@import "~@/assets/scss/mixin.scss";

input.temp{
  background-color: #1c1c1c;
  color: white;
}

.docs {
  display: flex;
  flex-direction: column;
  align-items: center;

  .rich-text{
    width: 40vw;
    height: 120px;
  }

  .rich-text-area{
    width: 40vw;
    height: 120px;
  }

  button.submit{
    margin: 2px;
    padding: 10px;
    background-color: black;
    color: white;
    border-radius: 10px;
  }

  .title {
    margin-top: 160px;
    font-family: "Diagramm", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: #1c1c1e;
  }

  .description {
    margin-top: 60px;
    width: 100%;
    padding: 0 180px;
    box-sizing: border-box;

    font-family: "Inter", sans-serif;
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    color: #000000;

    h3 {
      font-size: 20px;
    }

    ol {
      list-style: decimal inside;
    }

    ul {
      list-style: disc inside;
    }

    li > ul {
      padding-left: 1em;
    }
  }
}

@include tablet {
  .docs {
    display: flex;
    flex-direction: column;

    .description {
      padding: 0 40px;
    }
  }
}

@include mobile {
  .docs {
    display: flex;
    flex-direction: column;

    .description {
      margin-top: 40px;
      padding: 0 20px;
    }
  }
}
</style>
