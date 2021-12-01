<template>
  <div id="nav">
    <Navigation />
  </div>
  <router-view />
</template>

<script>
import Navigation from "@/components/navigation.vue";

export default {
  components: {
    Navigation,
  },
};
</script>
