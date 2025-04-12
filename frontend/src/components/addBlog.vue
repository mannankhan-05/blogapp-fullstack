<template>
  <div>
    <v-btn
      v-if="isLoggedIn"
      color="primary"
      variant="elevated"
      class="text-white"
      block
      :style="{ boxShadow: 'var(--shadow-button)' }"
      @click="openDialog = !openDialog"
    >
      <v-icon class="mr-2">mdi-plus-box</v-icon>
      Create New Blog
    </v-btn>

    <v-dialog
      v-model="openDialog"
      width="600"
      class="custom-height"
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
            Create A New Blog
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="title"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Title"
              placeholder="Enter title of blog"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="author"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Author"
              placeholder="Enter author name"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
            ></v-text-field>

            <v-textarea
              v-model="description"
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Description"
              placeholder="Enter description of blog"
              variant="outlined"
              color="primary"
              bg-color="surface"
              clearable
              rows="5"
            ></v-textarea>

            <v-file-input
              clearable
              name="image"
              label="Blog Picture"
              v-model="picture"
              @change="handleFileChange($event)"
              variant="outlined"
              color="primary"
              bg-color="surface"
              prepend-icon="mdi-image"
              accept="image/*"
              :show-size="true"
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
              @click="openDialog = !openDialog"
            ></v-btn>
            <v-btn
              text="Create"
              variant="elevated"
              color="primary"
              class="font-weight-medium text-white ml-2"
              :style="{ boxShadow: 'var(--shadow-button)' }"
              @click="createBlog"
            >
              <v-icon class="mr-1">mdi-plus</v-icon>
              Create Blog
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
      openDialog: false,
      title: "",
      author: "",
      description: "",
      picture: null,
      imageUrl: "",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    async createBlog() {
      // creates a new FormData object. FormData is used to construct a set of key/value pairs
      // representing form fields and their values, which can then be sent using an XMLHttpRequest or fetch.
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("author", this.author);
      formData.append("description", this.description);
      formData.append("image", this.picture);
      formData.append("userId", this.$store.state.loggedInUserId);

      await axiosInstance.post(
        `/postBlog/${this.$store.state.loggedInUserId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      this.title = "";
      this.author = "";
      this.description = "";
      this.picture = null;
      this.imageUrl = "";

      setTimeout(() => {
        this.openDialog = false;
      });
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file instanceof File) {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.imageUrl = "";
      }
    },
  },
};
</script>

<style>
.v-dialog > .v-card {
  border-radius: var(--radius-large);
  overflow: hidden;
}
</style>
