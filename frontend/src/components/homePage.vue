<template>
  <v-container>
    <div class="ma-3">
      <v-carousel class="rounded border-sm">
        <v-carousel-item
          src="https://images.unsplash.com/opengraph/1x1.png?blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1486312338219-ce68d2c6f44d%3Fblend%3D000000%26blend-alpha%3D10%26blend-mode%3Dnormal%26crop%3Dfaces%252Cedges%26h%3D630%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fh%253D84%2526txt%253Dblog%2526txt-align%253Dmiddle%25252Cleft%2526txt-clip%253Dellipsis%2526txt-color%253D000000%2526txt-pad%253D80%2526txt-size%253D40%2526txt-width%253D660%2526w%253D750%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26mark-align%3Dmiddle%252Ccenter%26mark-w%3D750%26w%3D1200%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8M3x8YmxvZ3xlbnwwfHx8fDE3MTc1NjQzODh8MA%26ixlib%3Drb-4.0.3&blend-w=1&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60"
        ></v-carousel-item>
        <v-carousel-item
          src="https://cameroondeskacademy.com/wp-content/uploads/2018/12/blogging-SMB.png.webp"
        ></v-carousel-item>

        <v-carousel-item
          src="https://www.ascian.in/creatives/wp-content/uploads/blog.jpg"
        ></v-carousel-item>
      </v-carousel>

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
              <img :src="blog.b_picture" alt="Blog Image" class="mb-2 image" />
            </div>
            <div class="font-weight-medium">
              {{ textTruncate(blog.b_description, 8) }}
            </div>
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
    textTruncate(text, wordLimit) {
      const words = text.split(" ");
      if (words <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(" ") + " ...";
    },
  },
};
</script>

<style scoped>
.image {
  width: 300px;
  height: 220px;
}
</style>
