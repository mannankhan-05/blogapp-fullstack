<template>
  <v-app>
    <Navbar />
    <v-main class="bg-background">
      <router-view></router-view>
    </v-main>
    <MyFooter />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import MyFooter from "./components/footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    MyFooter,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

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

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;

  --transition-default: all 0.3s ease;
  --transition-fast: all 0.15s ease;
  --transition-slow: all 0.5s ease;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: var(--background);
  color: var(--text-primary);
}
</style>
