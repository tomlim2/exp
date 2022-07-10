<template>
  <div class="my-page">
    <Header />
    <router-view />
    <ModalArea />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/common/Header.vue";
import ModalArea from "@/ModalArea.vue";

export default defineComponent({
  components: { Header, ModalArea },
});
</script>
