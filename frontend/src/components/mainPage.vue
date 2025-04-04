<template>
  <div class="bg-background">
    <div class="d-flex align-center flex-column pa-6">
      <v-btn-toggle
        @click="editBlog = !editBlog"
        divided
        color="primary"
        density="comfortable"
        rounded="lg"
        class="mb-4"
      >
        <v-btn icon="mdi-format-align-justify"></v-btn>
      </v-btn-toggle>
      <h1 class="text-h4 text-primary font-weight-medium mb-6">My Blogs</h1>
    </div>

    <div class="blog-container px-4">
      <v-card
        variant="elevated"
        elevation="0"
        :style="{ boxShadow: 'var(--shadow-card)' }"
        class="pa-4 ma-3 blog-card"
        width="370"
        rounded="lg"
        v-for="blogs in AllBlogs"
        :key="blogs.b_id"
      >
        <div v-if="editBlog" class="edit-controls">
          <v-btn
            @click="OpenEditDialog(blogs)"
            icon="mdi-pencil"
            color="primary"
            variant="text"
            size="small"
            class="mr-2"
          ></v-btn>
          <v-btn
            @click="showDeleteDialog(blogs)"
            icon="mdi-delete"
            color="error"
            variant="text"
            size="small"
          ></v-btn>
        </div>

        <h2 class="text-h5 text-primary font-weight-medium mb-4">
          {{ blogs.b_title }}
        </h2>
        <v-img
          :src="blogs.b_picture"
          alt="Blog Image"
          class="mb-4 rounded-lg"
          height="200"
          cover
        ></v-img>

        <p class="text-body-1 mb-4 text-text-primary">
          {{ truncateText(blogs.b_description, 7) }}
        </p>

        <div class="d-flex justify-end">
          <router-link
            :to="{
              name: 'viewBlog',
              params: { id: $store.state.loggedInUserId, blogid: blogs.b_id },
            }"
          >
            <v-btn
              variant="elevated"
              color="primary"
              class="text-white"
              :style="{ boxShadow: 'var(--shadow-button)' }"
              @click="setBlogId(blogs)"
            >
              <v-icon class="mr-1">mdi-eye</v-icon>
              View Blog
            </v-btn>
          </router-link>
        </div>
      </v-card>
    </div>

    <v-dialog
      v-model="removeBlogDialog"
      max-width="400"
      persistent
      :style="{ boxShadow: 'var(--shadow-dialog)' }"
    >
      <v-card
        prepend-icon="mdi-delete"
        title="Delete Blog"
        class="pa-4"
        rounded="lg"
        elevation="0"
        :style="{ boxShadow: 'var(--shadow-card)' }"
      >
        <v-card-text class="text-body-1 py-4">
          Are you sure you want to delete this blog?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            @click="removeBlogDialog = false"
            variant="outlined"
            color="primary"
            class="font-weight-medium"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="deleteBlog()"
            variant="elevated"
            color="error"
            class="ml-2 font-weight-medium text-white"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      persistent
      width="600"
      class="custom-height"
      v-model="openEditDialog"
      :style="{ boxShadow: 'var(--shadow-dialog)' }"
    >
      <template v-slot:default="{}">
        <v-card
          class="pa-4"
          rounded="lg"
          elevation="0"
          :style="{ boxShadow: 'var(--shadow-card)' }"
        >
          <v-card-title class="text-h5 text-primary font-weight-bold mb-4">
            Update Blog
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="selectedBlog.b_title"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Title"
              placeholder="Edit title of blog"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="selectedBlog.b_author"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Author"
              placeholder="Edit author name"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>

            <v-textarea
              v-model="selectedBlog.b_description"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Description"
              placeholder="Edit description of blog"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
              rows="5"
            ></v-textarea>

            <v-file-input
              v-model="selectedBlog.b_picture"
              name="image"
              @change="handleFileChange($event)"
              variant="outlined"
              color="primary"
              bg-color="surface"
              prepend-icon="mdi-image"
              accept="image/*"
              :show-size="true"
              label="Blog Image"
            >
              <template v-slot:selection="{ text }">
                <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                  <img :src="imageUrl" alt="Selected Image" />
                </v-avatar>
                {{ text }}
              </template>
            </v-file-input>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Cancel"
              variant="outlined"
              color="primary"
              class="font-weight-medium"
              @click="openEditDialog = false"
            ></v-btn>
            <v-btn
              text="Update"
              variant="elevated"
              color="primary"
              class="font-weight-medium text-white ml-2"
              :style="{ boxShadow: 'var(--shadow-button)' }"
              @click="updateBlog"
            >
              <v-icon class="mr-1">mdi-content-save</v-icon>
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import axiosInstance from "../apis/axiosInstance.js";

export default {
  data() {
    return {
      AllBlogs: [],
      editBlog: false,
      openEditDialog: false,
      selectedBlog: null,
      removeBlogDialog: false,
      imageUrl: "",
      blogId: null,
    };
  },
  async mounted() {
    let response = await axiosInstance.get(
      `/userBlogs/${this.$store.state.loggedInUserId}`
    );
    response.data.forEach((blog) => {
      this.AllBlogs.push(blog);
    });
  },

  methods: {
    setBlogId(blog) {
      this.selectedBlog = blog;
      this.blogId = blog.b_id;
    },
    showDeleteDialog(blog) {
      this.selectedBlog = blog;
      this.removeBlogDialog = true;
    },
    OpenEditDialog(blog) {
      this.selectedBlog = blog;
      this.openEditDialog = true;
    },
    async updateBlog() {
      const formData = new FormData();
      formData.append("title", this.selectedBlog.b_title);
      formData.append("author", this.selectedBlog.b_author);
      formData.append("description", this.selectedBlog.b_description);
      if (this.selectedBlog.b_picture instanceof File) {
        formData.append("image", this.selectedBlog.b_picture);
      }

      try {
        await axiosInstance.put(
          `/updateBlog/${this.selectedBlog.b_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.openEditDialog = false;

        // Update the blog in the local AllBlogs array
        const index = this.AllBlogs.findIndex(
          (blog) => blog.b_id === this.selectedBlog.b_id
        );
        if (index !== -1) {
          this.AllBlogs.splice(index, 1, this.selectedBlog);
        }
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    },
    async deleteBlog() {
      await axiosInstance.delete(`/deleteBlog/${this.selectedBlog.b_id}`);
      this.removeBlogDialog = false;

      // index is the start index from which elements will be removed. It was determined in the previous step using findIndex.
      // 1 is the number of elements to remove starting from the index.
      const index = this.AllBlogs.findIndex((blog) => {
        blog.b_id === this.selectedBlog.b_id;
      });
      this.AllBlogs.splice(index, 1);
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file instanceof File) {
        this.selectedBlog.b_picture = file;
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = "";
      }
    },
    truncateText(text, wordLimit) {
      const words = text.split(" ");
      if (words.length <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(" ") + " ...";
    },
  },
};
</script>

<style>
.image {
  height: 200px;
  width: 100%;
  border-radius: var(--radius-medium);
  object-fit: cover;
}

.blog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.blog-card {
  position: relative;
  height: auto;
  width: 100%;
  max-width: 370px;
  margin-bottom: 24px;
  border-radius: var(--radius-large);
  transition: var(--transition-default);
  background-color: var(--surface);
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.edit-controls {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-medium);
  padding: 4px;
}

@media (min-width: 768px) {
  .blog-card {
    width: calc(50% - 24px);
    margin: 12px;
  }
}

@media (min-width: 1024px) {
  .blog-card {
    width: calc(33.33% - 24px);
    margin: 12px;
  }
}

@media (min-width: 1440px) {
  .blog-card {
    width: calc(25% - 24px);
    margin: 12px;
  }
}
</style>
