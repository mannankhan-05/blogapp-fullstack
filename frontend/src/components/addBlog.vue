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
          <p class="text-caption font-weight-medium ml-10 mt-0">
            Once you upload the blog photo. you will not be able to change it
          </p>

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
import axios from "axios";

export default {
  data() {
    return {
      openDialog: false,
      title: "",
      author: "",
      description: "",
      picture: "",
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
      await axios.post(
        `http://localhost:3000/postBlog/${this.$store.state.loggedInUserId}`,
        {
          title: this.title,
          author: this.author,
          description: this.description,
          picture: this.picture.name,
          userId: this.$store.state.loggedInUserId,
        }
      );
      this.title = "";
      this.author = "";
      this.description = "";

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
      console.log(this.imageUrl);
    },
  },
};
</script>

<style></style>
