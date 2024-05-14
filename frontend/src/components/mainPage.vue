<template>
  <div>
    <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
      <v-btn-toggle @click="editBlog = !editBlog" divided>
        <v-btn icon="mdi-format-align-justify"></v-btn>
      </v-btn-toggle>
    </div>

    <div class="blog-container">
      <v-card
        variant="tonal"
        class="pa-2 ma-3 blog-card"
        width="400"
        v-for="blogs in AllBlogs"
        :key="blogs.b_id"
      >
        <h6 class="pa-0 mb-2">{{ blogs.b_id }}</h6>
        <div v-if="editBlog" class="editButton">
          <v-icon icon="mdi-pencil-circle-outline"></v-icon>
        </div>
        <h2 class="text-decoration-underline mb-3">{{ blogs.b_title }}</h2>
        <img :src="require(`@/assets/${blogs.b_picture}`)" class="mb-2 image" />

        <p class="mb-2">{{ blogs.b_description }}</p>
        <h5 class="mb-0 bg-grey text-white text-center">
          Author : {{ blogs.b_author }}
        </h5>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      AllBlogs: [],
      editBlog: false,
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

<style>
.image {
  height: 50%;
  width: 100%;
  border-radius: 5px;
}

/* line 54 - 81  =>  adjusting the cards in a row as many as possible */
.blog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.blog-card {
  height: 380px;
  width: calc(50% - 20px); /* Adjust width as needed */
  margin-bottom: 20px;
  border-radius: 5px;
}
.blog-card:hover {
  box-shadow: 0 0 5px 2px rgb(173, 166, 166);
}

@media (min-width: 768px) {
  .blog-card {
    width: calc(33.33% - 20px); /* Adjust width as needed */
  }
}

@media (min-width: 1024px) {
  .blog-card {
    width: calc(25% - 20px); /* Adjust width as needed */
  }
}

.editButton {
  position: absolute;
  right: 2%;
  top: 2%;
  font-size: 20px;
}
.editButton:hover {
  cursor: pointer;
}
</style>
