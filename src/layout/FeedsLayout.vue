<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Feeds/Header.vue";
import Footer from "@/components/Feeds/Footer.vue";

export default defineComponent({
  name: "HomeLayoutDefault",
  components: {
    Header,
    Footer,
  },
});
</script>