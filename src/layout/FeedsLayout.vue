<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/feeds/Header.vue";
import Footer from "@/components/feeds/Footer.vue";

export default defineComponent({
  name: "HomeLayoutDefault",
  components: {
    Header,
    Footer,
  },
});
</script>