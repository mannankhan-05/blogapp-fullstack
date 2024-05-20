<template>
  <v-container fluid>
    <v-footer class="bg-grey-darken-3">
      <v-row justify="center" align="center" no-gutters>
        <v-col
          v-for="link in links"
          :key="link"
          cols="auto"
          class="d-flex justify-center"
        >
          <v-btn class="mx-2 rounded" color="white" variant="text">
            {{ link }}
          </v-btn>
        </v-col>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: "MyFooter",
  data: () => ({
    links: ["Home", "About Us", "Blog", "Contact Us"],
  }),
};
</script>

<style scoped></style>
