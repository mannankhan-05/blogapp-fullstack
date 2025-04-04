<template>
  <div>
    <v-btn
      v-if="isLoggedIn"
      color="blue-darken-4"
      variant="tonal"
      @click="openDialog = !openDialog"
    >
      <v-icon class="pr-3">mdi-plus-box</v-icon>
      Create New Blog</v-btn
    >

    <v-dialog v-model="openDialog" width="600" class="custom-height">
      <template v-slot:default="{}">
        <v-card>
          <h2 class="text-decoration-underline ma-5">Create A New Blog</h2>
          <v-card-text>
            <v-text-field
              v-model="title"
              prepend-inner-icon=""
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Title"
              placeholder="Enter title of blog"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="author"
              prepend-inner-icon=""
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Author"
              placeholder="Enter author name"
              clearable
            ></v-text-field>

            <v-textarea
              v-model="description"
              prepend-inner-icon=""
              type="text"
              :readonly="loading"
              :rules="[required]"
              label="Description"
              placeholder="Enter description of blog"
              clearable
            ></v-textarea>
          </v-card-text>

          <v-file-input
            clearable
            name="image"
            label="Blog Picture"
            v-model="picture"
            @change="handleFileChange($event)"
          >
            <template v-slot:selection="{ text }">
              <v-avatar v-if="imageUrl" size="30" class="mr-3 rounded">
                <img :src="imageUrl" alt="Selected Image" />
              </v-avatar>
              {{ text }}
            </template>
          </v-file-input>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Close"
              variant="tonal"
              class="font-weight-bold"
              @click="openDialog = !openDialog"
            ></v-btn>
            <v-btn
              text="Create"
              variant="tonal"
              class="font-weight-bold"
              color="blue-darken-4"
              @click="createBlog"
            ></v-btn>
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

<style></style>
