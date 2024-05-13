<template>
  <!-- <v-layout> -->
  <div>
    <v-card
      variant="tonal"
      class="pa-2 ma-3"
      width="400"
      v-for="blogs in AllBlogs"
      :key="blogs.b_id"
    >
      <h6 class="pa-0 mb-3">{{ blogs.b_id }}</h6>
      <h2 class="text-decoration-underline mb-3">{{ blogs.b_title }}</h2>
      <p class="mb-3">{{ blogs.b_description }}</p>
      <h5 class="mb-0 bg-grey text-white text-center">
        Author : {{ blogs.b_author }}
      </h5>
    </v-card>
  </div>
  <!-- </v-layout> -->
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
    response.data.forEach((blog) => {
      this.AllBlogs.push(blog);
    });
  },
};
</script>

<style></style>
