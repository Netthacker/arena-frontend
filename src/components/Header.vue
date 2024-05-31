<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {


    return {
    };
  },
});
</script>


<template>
  <v-card
  app
  color="primary"
  class="mx-auto"
  height="50px"
  >
    <v-row class=" items-center">
      <v-toolbar-title class="my-5 ml-5">Arena Online</v-toolbar-title>

    </v-row>
  </v-card>
</template>
