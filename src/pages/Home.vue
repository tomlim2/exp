<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Home/Header.vue";
import Footer from "@/components/Home/Footer.vue";

export default defineComponent({
  name: "MainPlan",
  components: {
    Header,
    Footer,
  },
});
</script>