<template>
  <div class="docs">
    <div>
        <RichTextInputArea 
        class="rich-text-area" 
        :tagListInSearch="state.tagListInSearch" 
        @onTextInput='onTextInput' 
        @onTagInSearch='onTagInSearch'
        />
        <br>
        <div style="display: flex">
        <button class="submit" @click="onSubmit('post')">toPost</button>
        </div>
        <br><br>
        <h1>ReadOnly</h1>
        <br>
        <RichText :contentsText="state.gotText" :mentionList="state.mentionList" class="rich-text"/>
    </div>

  </div>
</template>

<script lang="ts">
import RichTextInputArea from "@/components/RichText/RichTextInputArea.vue";
import RichText from "@/components/RichText/RichText.vue";

import { defineComponent, onMounted, reactive } from "vue";
import { TextItemDetail, linkDetails, searchHashTag, searchMention } from '@/components/RichText/RichText'

const mentionTestList = [{nickname: 'johnson', profileUri: 'https://via.placeholder.com/150', userId: 111}, {nickname: 'johnsoooon', profileUri: 'https://via.placeholder.com/150', userId: 444},{nickname: 'johnsonnnnnnnn', profileUri: 'https://via.placeholder.com/150', userId: 333},{nickname:'amy', profileUri: 'https://via.placeholder.com/250', userId:123}, {nickname:'야근', profileUri: 'https://via.placeholder.com/120', userId: 222}]

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
      searchKeyword:'',
      mentionList: mentionTestList
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
          const dummyList = [{tag: 'hi', count: 10}, {tag:'why', count:10}, {tag:'slow', count:10}]
          const result = searchHashTag(text, dummyList);
          
          if(result.tags){
            state.tagListInSearch = result.tags;
          } else {
            state.tagListInSearch = []
          }
        } else if(tagType == "mention"){
          const dummyList = mentionTestList;
          const result = searchMention(text, dummyList);

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

    const onSubmit = async ( id: string) => {
      let result
      const contents = state.rawText;
      const tags = linkDetails(state.rawText).filter((links:TextItemDetail)=>links.type === "hashTag").map(((links:TextItemDetail)=>links.text.slice(1,links.text.length))).join();

      if (id == "post"){
        
          state.gotText = contents
      }

      console.log(result, contents, tags);
    }

    return {
      state,
      onSearchKeywordInput,
      onTextInput,
      onTagInSearch,
      onSubmit,
    };
  },
});
</script>

<style lang="scss">
input.temp{
  background-color: #1c1c1c;
  color: white;
}

.docs {
  display: flex;

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

</style>
