<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Feeds/Header.vue";
import Footer from "@/components/Feeds/Footer.vue";

export default defineComponent({
  components: {
    Header,
    Footer,
  },
});
</script>