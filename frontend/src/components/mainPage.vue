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
        width="370"
        v-for="blogs in AllBlogs"
        :key="blogs.b_id"
      >
        <div v-if="editBlog" class="editButton">
          <v-icon
            @click="OpenEditDialog(blogs)"
            icon="mdi-pencil-circle-outline"
            color="green-darken-4"
          ></v-icon>
        </div>
        <div v-if="editBlog" class="deleteButton">
          <v-icon
            @click="showDeleteDialog(blogs)"
            icon="mdi-delete"
            color="red-darken-4"
          ></v-icon>
        </div>
        <h2 class="text-decoration-underline mb-3">{{ blogs.b_title }}</h2>
        <img :src="require(`@/assets/${blogs.b_picture}`)" class="mb-2 image" />

        <p class="mb-2">{{ blogs.b_description }}</p>
        <h5 class="mb-0 bg-grey text-white text-center">
          Author : {{ blogs.b_author }}
        </h5>
      </v-card>
    </div>

    <v-dialog v-model="removeBlogDialog" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-delete"
        text="Are U sure You Want To Delete This Blog ?"
        title="Delete Blog"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="removeBlogDialog = false"
            variant="tonal"
            color="black-darken-2"
            class="font-weight-medium"
          >
            No
          </v-btn>
          <v-btn
            @click="deleteBlog(selectedBlog)"
            variant="tonal"
            color="blue-darken-4"
            class="ml-2 font-weight-medium"
          >
            Yes
          </v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog
      persistent
      width="600"
      class="custom-height"
      v-model="openEditDialog"
    >
      <template v-slot:default="{}">
        <v-card>
          <h2 class="text-decoration-underline ma-5">Update Blog</h2>
          <v-card-text>
            <v-text-field
              v-model="selectedBlog.b_title"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Title"
              placeholder="Edit title of blog"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="selectedBlog.b_author"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Author"
              placeholder="Edit author name"
              clearable
            ></v-text-field>

            <v-textarea
              v-model="selectedBlog.b_description"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Description"
              placeholder="Edit description of blog"
              clearable
            ></v-textarea>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Close"
              variant="tonal"
              class="font-weight-bold"
              @click="openEditDialog = false"
            ></v-btn>
            <v-btn
              text="Update"
              variant="tonal"
              class="font-weight-bold"
              color="blue-darken-4"
              @click="updateBlog"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      AllBlogs: [],
      editBlog: false,
      openEditDialog: false,
      // the blog i am selecting to edit
      selectedBlog: null,
      removeBlogDialog: false,
    };
  },
  async mounted() {
    let response = await axios.get(
      `http://localhost:3000/userBlogs/${this.$store.state.loggedInUserId}`
    );
    response.data.forEach((blog) => {
      this.AllBlogs.push(blog);
    });
  },

  methods: {
    showDeleteDialog(blog) {
      this.selectedBlog = blog;
      this.removeBlogDialog = true;
    },
    OpenEditDialog(blog) {
      this.selectedBlog = blog;
      this.openEditDialog = true;
    },
    async updateBlog() {
      await axios.put(
        `http://localhost:3000/updateBlog/${this.selectedBlog.b_id}`,
        {
          title: this.selectedBlog.b_title,
          author: this.selectedBlog.b_author,
          description: this.selectedBlog.b_description,
        }
      );
      this.openEditDialog = false;
    },
    async deleteBlog(blog) {
      try {
        await axios.delete(
          `http://localhost:3000/deleteBlog/${this.selectedBlog.b_id}`
        );
        // Remove the deleted blog from AllBlogs array
        const index = this.AllBlogs.findIndex((b) => b.b_id === blog.b_id);
        if (index !== -1) {
          this.AllBlogs.splice(index, 1);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
      this.removeBlogDialog = false;
    },
  },
};
</script>

<style>
.image {
  height: 50%;
  width: 100%;
  border-radius: 5px;
}
.blog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.blog-card {
  height: 380px;
  width: calc(50% - 20px);
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
  right: 11%;
  top: 2%;
  font-size: 20px;
}
.editButton:hover {
  cursor: pointer;
}

.deleteButton {
  position: absolute;
  right: 2%;
  top: 2%;
  font-size: 20px;
}
.deleteButton:hover {
  cursor: pointer;
}
</style>
