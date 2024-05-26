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
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout" color="red" dark>Logout</v-btn>
  </v-app-bar>
</template>
