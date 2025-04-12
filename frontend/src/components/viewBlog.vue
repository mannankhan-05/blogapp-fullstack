<template>
  <v-container class="pa-6 bg-background">
    <v-layout>
      <router-link :to="{ name: 'users', id: $store.state.loggedInUserId }">
        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="mdi-arrow-left"
          class="mb-6"
        >
          Back to Blogs
        </v-btn>
      </router-link>

      <div class="blog-content" v-for="blog in blog" :key="blog.id">
        <div class="blog-date">
          <v-chip color="primary" text-color="white" size="small">
            {{ formattedDate(blog.date) }}
          </v-chip>
        </div>

        <h1 class="text-h3 text-primary font-weight-bold text-center mb-8">
          {{ blog.title }}
        </h1>

        <v-img
          :src="blog.picture"
          class="blog-image rounded-lg mb-8"
          height="400"
          cover
          :style="{ boxShadow: 'var(--shadow-card)' }"
        ></v-img>

        <div class="blog-description text-body-1 mb-8">
          {{ blog.description }}
        </div>

        <div class="blog-author">
          <v-chip
            color="secondary"
            text-color="white"
            prepend-icon="mdi-account"
            size="large"
          >
            Author: {{ blog.author }}
          </v-chip>
        </div>
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
      const format = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, format);
    },
  },
};
</script>

<style>
.blog-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 24px;
  background-color: var(--surface);
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-card);
}

.blog-date {
  position: absolute;
  right: 24px;
  top: 24px;
}

.blog-author {
  position: absolute;
  right: 24px;
  bottom: 24px;
}

.blog-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}

.blog-description {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .blog-content {
    padding: 16px;
  }

  .blog-date,
  .blog-author {
    position: relative;
    right: auto;
    top: auto;
    bottom: auto;
    margin-bottom: 16px;
  }

  .blog-author {
    margin-top: 24px;
  }

  h1 {
    font-size: 28px;
    margin-top: 16px;
  }
}
</style>
