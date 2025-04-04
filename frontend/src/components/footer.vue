<template>
  <v-footer
    class="text-white"
    color="primary"
    :style="{ boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)' }"
  >
    <v-container>
      <v-row justify="center" align="center" no-gutters>
        <v-col
          v-for="link in links"
          :key="link"
          cols="auto"
          class="d-flex justify-center"
        >
          <v-btn class="mx-2 rounded text-white" variant="text">
            {{ link }}
          </v-btn>
        </v-col>
        <v-col class="text-center mt-4" cols="12">
          <div class="d-flex justify-center align-center gap-2 mb-2">
            <v-btn
              icon="mdi-facebook"
              variant="text"
              color="white"
              size="small"
            ></v-btn>
            <v-btn
              icon="mdi-twitter"
              variant="text"
              color="white"
              size="small"
            ></v-btn>
            <v-btn
              icon="mdi-instagram"
              variant="text"
              color="white"
              size="small"
            ></v-btn>
          </div>
          <div class="text-body-2 text-white">
            {{ new Date().getFullYear() }} — <strong>BlogVue</strong> | All
            Rights Reserved
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "MyFooter",
  data: () => ({
    links: ["Home", "About Us", "Blog", "Contact Us"],
  }),
};
</script>

<style scoped>
.v-btn {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
}
</style>
