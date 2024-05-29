<template>
  <v-container>
    <div class="ma-3">
      <h2 class="mt-5 mb-0 text-decoration-underline font-weight-black">
        Sample Blogs
      </h2>

      <v-row>
        <v-col cols="4" v-for="blog in sampleBlogs" :key="blog.b_id" xs="12">
          <v-sheet
            :height="400"
            :width="350"
            color="grey-lighten-2 mt-5"
            class="pa-6 rounded"
          >
            <p class="text-right pt-0">
              {{ formattedDate(blog.b_date) }}
            </p>
            <h2 class="pt-0 text-decoration-underline">{{ blog.b_title }}</h2>
            <div>
              <img
                :src="blog.b_picture"
                alt="Blog Image"
                class="mb-2 image"
                :width="300"
                :height="200"
              />
            </div>
            <div class="font-weight-medium">{{ blog.b_description }}</div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sampleBlogs: [],
    };
  },

  async mounted() {
    let response = await axios.get("http://localhost:3000/blogs");
    response.data.forEach((blog) => {
      this.sampleBlogs.push(blog);
    });
  },

  methods: {
    formattedDate(epoch) {
      const date = new Date(epoch * 1000); // Convert epoch seconds to milliseconds
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style>
.expand {
  width: 35%;
}
</style>
