<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Sidebar',
});
</script>


<template>
  <v-navigation-drawer app permanent width="100">
    <v-list>
      <v-list-item>
        <v-list-item-title>Opção 1</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Opção 2</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Opção 3</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
