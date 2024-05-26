<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DashboardCard',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    subtitle: {
      type: String as PropType<string>,
      required: true,
    },
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    <v-card-text>{{ content }}</v-card-text>
  </v-card>
</template>
