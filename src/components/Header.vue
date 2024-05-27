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
  <v-card>
    <v-row>
      <v-col cols="12" md="12">
        <v-app-bar app color="primary" dark>
              <v-toolbar-title style="margin-left:15px">Arena Online</v-toolbar-title>
            <v-col cols="12" md="1">
              <v-btn
                color="grey-darken-4"
                icon="mdi-logout"
                @click="logout"
                dark>
              </v-btn>
            </v-col>
        </v-app-bar>
      </v-col>
    </v-row>
  </v-card>
</template>
