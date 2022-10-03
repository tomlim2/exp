<template>
  <div class="rich-text-input-area">
    <textarea
      ref="richTextareaRef"
      class="textarea textInput"
      :value="state.raw"
      @input="onInput"
      @keydown="selectResultByUpAndDown"
      @keyup="checkCursorPosition"
      @click="checkCursorPosition"
      @scroll="matchScrollTop"
    />
    
    <div
      ref="displayAreaRef"
      class="textarea display"
    >
      <RichText :contentsText="state.raw" :mentionList="state.mentionList" />
    </div>
    <div class="search-bar" :class="{ appear: state.isSearchingTag && tagListInSearch.length > 0 }">
      <div class="item-list">
        <div v-if="state.selectedTagDetail && state.selectedTagDetail.type == 'hashTag'">
          <div
            class="item"
            v-for="(hashTagItem, index) in tagListInSearch"
            @click="insertText(hashTagItem, 'hashTag')"
            :class='{focused: state.searchFocus == index}'
            :disabled="!state.isSearchingTag"
            :key="index"
          >
            #{{ hashTagItem.tag }}
            count: {{hashTagItem.count}}
          </div>
        </div>
        <div v-if="state.selectedTagDetail && state.selectedTagDetail.type == 'mention'">
          <div
            class="item mention"
            v-for="(mentionItem, index) in tagListInSearch"
            @click="insertText(mentionItem, 'mention')"
            :class='{focused: state.searchFocus == index}'
            :disabled="!state.isSearchingTag"
            :key="index"
          >
            <div class="img-frame"><img :src="mentionItem.profileUri" :alt="mentionItem.nickname"></div>
            <span class="nickname">@{{ mentionItem.nickname }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.isSearchingTag" class="backdrop" @click="closeSearchBar" />
  </div>
</template>

<script lang="ts">
export interface RichTextAreaState {
  raw: string;
  isSearchingTag: boolean;
  searchFocus: number;
  allTagList: TextItemDetails;
  tagKeywordInSearch: string;
  cursorStartPosition: number;
  cursorEndPosition: number;
  selectedTagDetail: TextItemDetail | undefined;
  mentionList: any;
}

export interface TagItem {
  tag: string; 
  count: number
}

import { defineComponent, PropType, reactive, ref, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { linkDetails, TextItemDetail, TextItemDetails } from './RichText';

import RichText from "./RichText.vue";

export default defineComponent({
  components: {RichText},
  props: {
    tagListInSearch: {
      type: Array as PropType<Array<TagItem>> | undefined,
      default: undefined
    },
  },
  emits: ['onTextInput', 'onTagInSearch'],
  setup(props,{emit}) {
    const state: RichTextAreaState = reactive({
      raw: "",
      allTagList: [],

      isSearchingTag: false,
      tagKeywordInSearch: "",
      selectedTagDetail: undefined,
      searchFocus: 0,

      cursorStartPosition: 0,
      cursorEndPosition: 0,
      mentionList:[]
    });

    const richTextareaRef = ref();
    const displayAreaRef = ref();

    const onInput = (event: any) => {
      state.raw = event.target.value;
      console.log(props.tagListInSearch);
      
      convertToRichText(state.raw);
      
      emit('onTextInput', state.raw);

      if(state.mentionList) {
        let newMentionList: any = [];
        
        state.mentionList.forEach((mentionItem: any)=>{
          if(state.allTagList.find((tag:any)=>tag.text == '@'+mentionItem.nickname)){
            newMentionList.push(mentionItem)
          }
        })
        state.mentionList = [...newMentionList];
      }
    };

    const convertToRichText = (text: string) => {
      state.allTagList = linkDetails(text)
    }

    const checkCursorPosition = (event:any) => {
      state.cursorStartPosition = event.target.selectionStart;
      state.cursorEndPosition = event.target.selectionEnd;
      
      checkLinkInArea()
      if(event.key == "Escape"){
          state.isSearchingTag = false;
        }
      // selectResultByUpAndDown(event)
    };

    const selectText = () => {
      if (state.isSearchingTag && state.selectedTagDetail) {
        const textarea = richTextareaRef.value;
        textarea.focus();
        textarea.setSelectionRange(
          state.selectedTagDetail.startIndexInAllText + 1,
          state.selectedTagDetail.endIndexInAllText
        );
      }
    };

    const insertText = (tagItem: any, tagType:string) => {
      if(tagType == 'hashTag'){
        if (state.isSearchingTag && state.selectedTagDetail) {
          const prevLinkDetailIndex = state.selectedTagDetail.startIndexInAllText

          state.raw = state.raw.substring(0, state.selectedTagDetail.startIndexInAllText + 1) + tagItem.tag + " " + state.raw.substring(state.selectedTagDetail.endIndexInAllText, state.raw.length);
          convertToRichText(state.raw);
          updateSelectedDetail();

          const updatedLinkDetail = state.allTagList.find((link:TextItemDetail) => link.startIndexInAllText == prevLinkDetailIndex);

          if(updatedLinkDetail){
            setTimeout(()=>updateCursorPosition(updatedLinkDetail), 0);
          }

          checkLinkInArea();
          closeSearchBar();
        }
      }
      if(tagType == 'mention'){
        if (state.isSearchingTag && state.selectedTagDetail) {
          const prevLinkDetailIndex = state.selectedTagDetail.startIndexInAllText;

          state.raw = state.raw.substring(0, state.selectedTagDetail.startIndexInAllText + 1) + tagItem.nickname + " " + state.raw.substring(state.selectedTagDetail.endIndexInAllText, state.raw.length);

          let isNameOnMentionList = false;

          state.mentionList.forEach((mention:any)=>{
            if(mention.nickname === tagItem.nickname){
              isNameOnMentionList = true;
            }
          })

          if(!isNameOnMentionList){
            state.mentionList.push(tagItem);
          }

          convertToRichText(state.raw);
          updateSelectedDetail();

          const updatedLinkDetail = state.allTagList.find((link:TextItemDetail) => link.startIndexInAllText == prevLinkDetailIndex);

          if(updatedLinkDetail){
            setTimeout(()=>updateCursorPosition(updatedLinkDetail), 0);
          }

          checkLinkInArea();
          closeSearchBar();
        }
      }
      
    };

    const matchScrollTop = () => {
      displayAreaRef.value.scrollTop = richTextareaRef.value.scrollTop;
    };

    const checkLinkInArea = () => {
      console.log(state.allTagList);
      
      state.allTagList.forEach((linkItem: TextItemDetail) => {
        if (linkItem.startIndexInAllText < state.cursorEndPosition && state.cursorEndPosition <= linkItem.endIndexInAllText ) {
          if (linkItem.type == "hashTag") {
            state.isSearchingTag = true;
            state.selectedTagDetail = linkItem;
            state.tagKeywordInSearch = linkItem.text;
            
            emit('onTagInSearch', linkItem);

            convertToRichText(state.raw)
            updateSearchBarPos(state.selectedTagDetail)

          } else if(linkItem.type == "mention"){
            state.isSearchingTag = true;
            state.selectedTagDetail = linkItem;
            state.tagKeywordInSearch = linkItem.text;
            
            emit('onTagInSearch', linkItem);

            convertToRichText(state.raw)
            updateSearchBarPos(state.selectedTagDetail)

          } else {
            closeSearchBar()
          }
        } else if (linkItem.startIndexInAllText == state.cursorEndPosition) {
          closeSearchBar()
        }
      });
    }

    const closeSearchBar = () => {
      state.isSearchingTag = false;
      state.tagKeywordInSearch = "";
      state.selectedTagDetail = undefined;
      state.searchFocus = 0;

      const itemListElement = document.getElementsByClassName('item-list')[0];

      itemListElement.scrollTop = 0;
    }

    const updateSelectedDetail = () => {
      if(state.selectedTagDetail){
        state.selectedTagDetail = state.allTagList.find((link:TextItemDetail) => link.startIndexInAllText == state.selectedTagDetail?.startIndexInAllText);
      }
    }

    const updateSearchBarPos = (linkDetails:TextItemDetail) => {
      if(state.isSearchingTag && linkDetails){
          const selectedLink = document.getElementsByClassName(`${linkDetails.type}-${linkDetails.startIndexInAllText}`)[0].getBoundingClientRect();
          const searchBarElement = document.getElementsByClassName(`search-bar`)[0] as HTMLElement
          const textAreaElement = (document.getElementsByClassName('rich-text-input-area')[0] as HTMLElement).getBoundingClientRect()
               
          searchBarElement.style.top = String(selectedLink.top - textAreaElement.top + 22) + 'px'
          searchBarElement.style.left = String(selectedLink.left - textAreaElement.left) + 'px'
        }
    }

    const updateCursorPosition = (linkDetails:TextItemDetail) => {
      if(linkDetails){
        const textarea = richTextareaRef.value;

        textarea.setSelectionRange(linkDetails.endIndexInAllText + 1, linkDetails.endIndexInAllText + 1)
        state.cursorStartPosition = linkDetails.endIndexInAllText + 1;
        state.cursorEndPosition = linkDetails.endIndexInAllText + 1;

        state.selectedTagDetail = undefined;
        state.isSearchingTag = false;
        state.tagKeywordInSearch = "";
        
        textarea.focus();
      }
    }

    watch(
      () => state.cursorStartPosition || state.cursorEndPosition,
      () => {
        checkLinkInArea()
      }
    );

    const selectResultByUpAndDown = (event:any) =>{
      if(state.isSearchingTag && event.isComposing == false){
        if(event.key === "ArrowUp"){
          if(state.searchFocus !== 0){
            event.preventDefault();
            state.searchFocus == 0 ? null : state.searchFocus -= 1
            changeSearchResultViewport('ArrowUp')
          }
        }
        if(event.key === "ArrowDown" && event.isComposing == false){
          event.preventDefault();
          if(props.tagListInSearch){
            state.searchFocus == props.tagListInSearch.length - 1 ? null : state.searchFocus += 1
            changeSearchResultViewport('ArrowDown')
          }
        }
        if(event.key === "Enter"  && event.isComposing == false){
          event.preventDefault();
          if(props.tagListInSearch && state.selectedTagDetail){
            insertText(props.tagListInSearch[state.searchFocus], state.selectedTagDetail.type)
          }
        }
        if(event.key == "Escape"){
          state.isSearchingTag = false
        }
      }
    }

    onBeforeRouteLeave(()=>{
      const textarea = richTextareaRef.value;
      textarea.value = "";
      closeSearchBar();
    })

    const changeSearchResultViewport = (id:string) =>{
      const itemListElement = document.getElementsByClassName('item-list')[0]
      const focusedItem = document.getElementsByClassName('focused')[0] as HTMLElement;
      
      switch (id) {
        case 'ArrowUp':
            itemListElement.scrollTop = focusedItem.offsetTop - focusedItem.scrollHeight
          break;

        case 'ArrowDown':
            itemListElement.scrollTop = focusedItem.offsetTop
          break;
      }
    }

    return {
      state,
      onInput,
      richTextareaRef,
      displayAreaRef,
      checkCursorPosition,
      matchScrollTop,
      selectText,
      insertText,
      updateCursorPosition,
      selectResultByUpAndDown,
      closeSearchBar
    };
  },
});
</script>

<style lang="scss" scoped>
.rich-text-input-area {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .textarea {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    font-size: 14px;
    line-height: 20px;
    box-sizing: border-box;
    background-color: #f0f0f0f0;
    line-break: anywhere;

    &:focus {
      z-index: 1001;
      background-color: rgba($color: #000000, $alpha: 0);
    }
  }

  .textInput {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: rgba($color: #000000, $alpha: 0.2);
    caret-color: black;
    opacity: 1;
    resize: none;
    border: none;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }

  .display {
    color: black;
    overflow-y: scroll;
    pointer-events: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .general-info{
    position: fixed;
  }

}
  .search-bar {
    position: absolute;
    background-color: #000000;
    
    width: 400px;
    
    padding: 4px 0;
    z-index: 9999999;
    display: none;

    border-radius: 5px;
    box-sizing: border-box;

    &.appear{
      display: block;
    }

    button {
      box-sizing: border-box;
      background: white;
      color: black;
      padding: 10px;
      margin: 10px;
    }

    .item-list{
      display: flex;
      max-height: 22vh;
      flex-direction: column;
      box-sizing: border-box;
      overflow-y: scroll;
      color: white;

      div.item {
        width: 100%;
        padding: 20px 14px;
        color: white;
        cursor: pointer;
  
        &.focused{
          background:#444;
          color: white;
        }

        &:hover{
          background:#444;
          color: white;
        }
      }

      .mention{
        display: flex;
        align-items: center;
        gap: 5px;

        .img-frame{
          width: 30px;
          height: 30px;
          overflow: hidden;
          border-radius: 15px;

          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .nickname{
          color: white;
        }
      }

      .item + .item{
        margin-top: 0px;
      }
    }
  }
  .backdrop{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }
</style>
