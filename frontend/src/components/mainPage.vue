<template>
  <v-layout>
    <v-card
      variant="tonal"
      class="pa-2 ma-3"
      width="400"
      v-for="blogs in AllBlogs"
      :key="blogs.b_id"
      >{{ blogs.b_id }}</v-card
    >
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      AllBlogs: [],
    };
  },
  async mounted() {
    let response = await axios.get("http://localhost:3000/allBlogs");
    this.AllBlogs.push(response.data);
  },
};
</script>

<style></style>
