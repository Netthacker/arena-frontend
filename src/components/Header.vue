<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Header',
  props: {
    name: {
      type:  String as PropType<String>,
      required: true,
    },
  },
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
      <v-toolbar-title class="my-5 ml-5">{{name}}</v-toolbar-title>

    </v-row>
  </v-card>
</template>
