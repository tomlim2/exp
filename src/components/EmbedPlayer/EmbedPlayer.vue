<template>
  <div id="embed-player" :class="{error: state.error}">
    <iframe 
    :src="state.source" 
    :title="state.title" 
    frameborder='0'
    scrolling='no'
    loading="lazy"
    allowfullscreen
    allow="encrypted-media;"
    width='100%' height='100%' style='position:absolute;top:0;left:0;'
    >
    </iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "vue";

export default defineComponent({
  props:{
    videoUrl: {
      type:String,
      default: ""
    }
  },
  setup(props) {
    const state = reactive({
      source: "",
      title: "",
      error: false
    })

    const checkVideoType = (videoUrl:string) =>{
      const urlName = videoUrl.replace(/.+\/\/|www.|\..+/g, '')
      let regExp
      let videoId

      if(!urlName){
        alert("The url is not valid.");
        state.error = true;
      }

      switch (urlName) {
        
        case 'youtu':
        case 'youtube':
          regExp = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
          videoId = videoUrl.match(regExp);

          if(videoId != null) {
            const youtubeId = videoId[1];
            
            state.source = 'https://www.youtube.com/embed/' + youtubeId;
            state.title = "YouTube video player"
            state.error = false;
          } else { 
            state.error = true;
            alert("The youtube url is not valid.");
          }
          break;

        case 'vimeo':
          regExp = /vimeo.*\/(\d+)/i
          videoId = regExp.exec(videoUrl);

          if(videoId !== null){
            const vimeoId = videoId[1]
            state.source = `https://player.vimeo.com/video/` + vimeoId
            state.title = "Vimeo video player"
            state.error = false;
          } else { 
            state.error = true
            alert("The vimeo url is not valid.");
          }

          break;
        
        case 'gfycat':
          regExp = /(?:https?:\/{2})?(?:w{3}\.)?gfycat?\.(?:com)([^\s&]+)/i
          videoId = videoUrl.match(regExp);

          if(videoId !== null){
            const gfcatId = videoId[1].split('/')[videoId[1].split('/').length-1]
            state.source = `https://gfycat.com/ifr/` + gfcatId
            state.title = "gfycat video player"
            state.error = false;
          } else { 
            state.error = true
            alert("The gfycat url is not valid.");
          }

          break;

        case 'coub':
          regExp = /(?:https?:\/{2})?(?:w{3}\.)?coub?\.(?:com)([^\s&]+)/i
          videoId = videoUrl.match(regExp);
      
          if(videoId !== null){
            const coubId = videoId[1].split('/')[videoId[1].split('/').length-1]
            state.source = `https://coub.com/embed/` + coubId
            state.title = "Coub video player"
            state.error = false;
          } else { 
            state.error = true
            alert("The gfycat url is not valid.");
          }

          break;

        case 'dai':
          regExp = /(?:https?:\/{2})?(?:w{3}\.)?dailymotion?\.(?:com)([^\s&]+)/i
          videoId = videoUrl.match(regExp);
      
          if(videoId !== null){
            const dailymotionId = videoId[1].split('/')[videoId[1].split('/').length-1]
            state.source = `https://dailymotion.com/embed/video/` + dailymotionId
            state.title = "Dailymotion player"
            state.error = false;
          } else { 
            state.error = true
            alert("The gfycat url is not valid.");
          }

          break;

        default:
          alert("The link does not supported.");
          state.error = true;
      }
    }

    watch(
      ()=> props.videoUrl,
      ()=> {
        if(props.videoUrl){
          checkVideoType(props.videoUrl)
        }
      }
    )

    return { state, props };
  },
});
</script>

<style lang="scss" scoped>
  #embed-player{
    position: relative; 
    //16:9
    padding-bottom: 56.25%;
    background-color: #252525;

    &.error{
      background-color: #ff5555;
    }
  }
</style>