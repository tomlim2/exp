<template>
  <div id="player"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    const state = {};

    onMounted(()=>{
      //   let YT: any;

      //   if(typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined'){
      //       let tag = document.createElement('script');

      //       tag.src = "https://www.youtube.com/iframe_api";
      //       let firstScriptTag = document.getElementsByTagName('script')[0];
      //       //@ts-ignore
      //       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      //       // 3. This function creates an <iframe> (and YouTube player)
      //       //    after the API code downloads.        
      //   }
    
      // let player:any;
      
      // function onYouTubeIframeAPIReady() {
      //   player = new YT.Player('player', {
      //     height: '390',
      //     width: '640',
      //     videoId: 'M7lc1UVf-VE',
      //     playerVars: {
      //       'playsinline': 1
      //     },
      //     events: {
      //       'onReady': onPlayerReady,
      //       'onStateChange': onPlayerStateChange
      //     }
      //   });
      // }

      // // 4. The API will call this function when the video player is ready.
      // //@ts-ignore
      // function onPlayerReady(event) {
      //   event.target.playVideo();
      // }

      // // 5. The API calls this function when the player's state changes.
      // //    The function indicates that when playing a video (state=1),
      // //    the player should play for six seconds and then stop.
      // var done = false;
      // //@ts-ignore
      // function onPlayerStateChange(event) {
      //   //@ts-ignore
      //   if (event.data == YT.PlayerState.PLAYING && !done) {
      //     setTimeout(stopVideo, 6000);
      //     done = true;
      //   }
      // }
      // function stopVideo() {
      //   player.stopVideo();
      // }

      // onYouTubeIframeAPIReady()
    })

    return {state};
  },
});
</script>

<style lang="scss" scoped>
</style>