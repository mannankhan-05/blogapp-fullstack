<template>
  <v-container class="pa-0">
    <div class="hero-section">
      <v-carousel
        class="rounded-lg overflow-hidden"
        height="500"
        hide-delimiters
        show-arrows="hover"
        cycle
        :style="{ boxShadow: shadowCard }"
      >
        <v-carousel-item
          src="https://images.unsplash.com/opengraph/1x1.png?blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1486312338219-ce68d2c6f44d%3Fblend%3D000000%26blend-alpha%3D10%26blend-mode%3Dnormal%26crop%3Dfaces%252Cedges%26h%3D630%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fh%253D84%2526txt%253Dblog%2526txt-align%253Dmiddle%25252Cleft%2526txt-clip%253Dellipsis%2526txt-color%253D000000%2526txt-pad%253D80%2526txt-size%253D40%2526txt-width%253D660%2526w%253D750%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26mark-align%3Dmiddle%252Ccenter%26mark-w%3D750%26w%3D1200%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8M3x8YmxvZ3xlbnwwfHx8fDE3MTc1NjQzODh8MA%26ixlib%3Drb-4.0.3&blend-w=1&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60"
        >
          <div
            class="carousel-overlay d-flex flex-column justify-center align-center text-white"
          >
            <h1 class="text-h2 font-weight-bold mb-4">Welcome to BlogVue</h1>
            <p class="text-h6 text-center max-width-md mb-6">
              Share your thoughts and stories with the world
            </p>
            <v-btn
              color="primary"
              size="large"
              variant="elevated"
              class="text-white"
              :style="{ boxShadow: shadowButton }"
              to="/login"
              v-if="!isLoggedIn"
            >
              Get Started
            </v-btn>
          </div>
        </v-carousel-item>
        <v-carousel-item
          src="https://cameroondeskacademy.com/wp-content/uploads/2018/12/blogging-SMB.png.webp"
        >
          <div
            class="carousel-overlay d-flex flex-column justify-center align-center text-white"
          >
            <h1 class="text-h2 font-weight-bold mb-4">
              Create Beautiful Blogs
            </h1>
            <p class="text-h6 text-center max-width-md mb-6">
              Express yourself with our elegant blogging platform
            </p>
            <v-btn
              color="secondary"
              size="large"
              variant="elevated"
              class="text-white"
              :style="{ boxShadow: shadowButton }"
              to="/register"
              v-if="!isLoggedIn"
            >
              Sign Up Now
            </v-btn>
          </div>
        </v-carousel-item>
        <v-carousel-item
          src="https://www.ascian.in/creatives/wp-content/uploads/blog.jpg"
        >
          <div
            class="carousel-overlay d-flex flex-column justify-center align-center text-white"
          >
            <h1 class="text-h2 font-weight-bold mb-4">Join Our Community</h1>
            <p class="text-h6 text-center max-width-md mb-6">
              Connect with other writers and readers
            </p>
            <v-btn
              color="accent"
              size="large"
              variant="elevated"
              class="text-white"
              :style="{ boxShadow: shadowButton }"
              to="/login"
              v-if="!isLoggedIn"
            >
              Explore Blogs
            </v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>

    <div class="featured-blogs pa-6">
      <h2 class="text-h4 text-primary font-weight-bold mb-6 text-center">
        Featured Blogs
      </h2>

      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="4"
          v-for="blog in sampleBlogs"
          :key="blog.id"
        >
          <v-card
            class="blog-card h-100"
            elevation="0"
            :style="{ boxShadow: shadowCard }"
            rounded="lg"
          >
            <v-img
              :src="blog.picture"
              height="200"
              cover
              class="blog-image"
            ></v-img>

            <v-card-item>
              <v-card-title class="text-primary font-weight-medium">
                {{ blog.b_title }}
              </v-card-title>
              <v-card-subtitle class="pt-2">
                {{ formattedDate(blog.date) }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              {{ textTruncate(blog.description, 15) }}
            </v-card-text>

            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="tonal"> Read More </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="cta-section py-12 px-6 text-center">
      <v-sheet
        color="primary"
        class="pa-12 rounded-lg"
        :style="{ boxShadow: shadowCard }"
      >
        <h2 class="text-h4 text-white font-weight-bold mb-4">
          Ready to start blogging?
        </h2>
        <p class="text-body-1 text-white mb-6 max-width-md mx-auto">
          Join our community of writers and share your stories with the world.
        </p>
        <v-btn
          color="white"
          variant="elevated"
          size="large"
          class="text-primary"
          :style="{ boxShadow: shadowButton }"
          to="/register"
          v-if="!isLoggedIn"
        >
          Get Started
        </v-btn>
      </v-sheet>
    </div>
  </v-container>
</template>

<script>
import axiosInstance from "../apis/axiosInstance.js";

export default {
  data() {
    return {
      sampleBlogs: [],
      // Theme variables as data properties
      shadowCard: "0 4px 12px rgba(0, 0, 0, 0.08)",
      shadowButton: "0 2px 8px rgba(94, 53, 177, 0.25)",
      radiusLarge: "12px",
      transitionDefault: "all 0.3s ease",
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  async mounted() {
    let response = await axiosInstance.get("/blogs");
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
      if (words.length <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(" ") + " ...";
    },
  },
};
</script>

<style scoped>
/* Theme variables */
:root {
  --primary: #5e35b1;
  --secondary: #00bcd4;
  --accent: #ff4081;
  --success: #4caf50;
  --info: #2196f3;
  --warning: #ffc107;
  --error: #ff5252;
  --background: #f5f7fa;
  --surface: #ffffff;
  --text-primary: #37474f;
  --text-secondary: #78909c;
  --border: #e0e0e0;
  --divider: #eeeeee;
  --card-bg: #ffffff;
  --navbar-bg: #5e35b1;
  --footer-bg: #37474f;

  --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-dialog: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-button: 0 2px 8px rgba(94, 53, 177, 0.25);
  --shadow-navbar: 0 2px 8px rgba(0, 0, 0, 0.1);

  --radius-small: 4px;
  --radius-medium: 8px;
  --radius-large: 12px;
  --radius-xl: 16px;
  --radius-circle: 50%;

  --transition-default: all 0.3s ease;
  --transition-fast: all 0.15s ease;
  --transition-slow: all 0.5s ease;
}

.hero-section {
  margin-bottom: 48px;
}

.carousel-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32px;
}

.max-width-md {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.blog-card {
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.blog-card:hover {
  transform: translateY(-4px);
}

.blog-image {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.cta-section {
  margin-top: 48px;
  margin-bottom: 48px;
}
</style>
