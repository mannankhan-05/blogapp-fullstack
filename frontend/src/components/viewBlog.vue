<template>
  <v-container class="pa-3">
    <v-layout>
      <router-link :to="{ name: 'users', id: $store.state.loggedInUserId }">
        <v-btn variant="outlined">Back</v-btn>
      </router-link>

      <div class="ml-5 blog" v-for="blog in blog" :key="blog.b_id">
        <h1 class="mt-6 mb-15">{{ blog.b_title }}</h1>
        <img :src="blog.b_picture" class="image ml-10" alt="" />
        <p class="mt-6 font-weight-medium">{{ blog.b_description }}</p>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: {
    blogid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      blog: [],
    };
  },
  async mounted() {
    let response = await axios.get(`http://localhost:3000/blog/${this.blogid}`);
    response.data.forEach((blog) => {
      this.blog.push(blog);
    });
  },
};
</script>

<style>
.blog {
  width: 80%;
}

.blog h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
}

.image {
  width: 90%;
  height: 60%;
}

.blog p {
  margin-left: 5%;
}
</style>
