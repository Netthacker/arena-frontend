<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/services/authService';

export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter();
    const logout = async () => {
      await authService.logout();
      router.push('/login');
    };

    return {
      logout,
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
        <v-btn
          flat
          size="small"
          color="primary"
           class="mx-5 my-4 align-self-center"
           length="24"
          thickness="2"
          vertical
          icon="mdi-logout"
          @click="logout"
          dark>
        </v-btn>

    </v-row>
  </v-card>
</template>
