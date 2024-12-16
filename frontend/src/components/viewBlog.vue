<template>
  <v-container class="pa-3">
    <v-layout>
      <router-link :to="{ name: 'users', id: $store.state.loggedInUserId }">
        <v-btn variant="outlined">Back</v-btn>
      </router-link>

      <div class="ml-5 blog" v-for="blog in blog" :key="blog.b_id">
        <h4>Dated : {{ formattedDate(blog.b_date) }}</h4>
        <h1 class="mt-6 mb-15">{{ blog.b_title }}</h1>
        <img :src="blog.b_picture" class="image ml-10" alt="" />
        <p class="mt-6 font-weight-medium">{{ blog.b_description }}</p>
        <h3 class="bg-grey rounded pt-1 pb-1 pl-3 pr-4 text--black">
          Created By : {{ blog.b_author }}
        </h3>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import axiosInstance from "../apis/axiosInstance.js";
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
    let response = await axiosInstance.get(`/blog/${this.blogid}`);
    response.data.forEach((blog) => {
      this.blog.push(blog);
    });
  },
  methods: {
    formattedDate(epoch) {
      const date = new Date(epoch * 1000);
      const format = { year: "numeric", month: "numeric", day: "numeric" };
      return date.toLocaleDateString(undefined, format);
    },
  },
};
</script>

<style>
.blog {
  width: 80%;
}

.blog h4 {
  position: absolute;
  right: 15px;
  top: 15px;
}

.blog h3 {
  position: absolute;
  right: 15px;
  bottom: 15px;
}

.blog h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
}

.image {
  width: 100%;
  height: 60%;
}

.blog p {
  margin-left: 5%;
}
</style>
