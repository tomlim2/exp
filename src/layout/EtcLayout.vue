<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/home/Header.vue";
import Footer from "@/components/home/Footer.vue";

export default defineComponent({
  name: "EtcLayoutDefault",
  components: {
    Header,
    Footer,
  },
});
</script>