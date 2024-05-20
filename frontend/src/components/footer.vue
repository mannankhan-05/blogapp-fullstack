<template>
  <v-footer class="bg-grey-darken-3">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2 rounded"
        color="white"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
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
