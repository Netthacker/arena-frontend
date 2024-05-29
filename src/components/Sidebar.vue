<script lang="ts">
import localStorageService from '@/services/localStorageService';
import { defineComponent,ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Sidebar',
  setup(){
    const userData = ref<{ name: string; email: string } | null>(null);

    const loadUserData = () => {
      const data = localStorageService.getUserData();
      if (data) {
        userData.value = data;
      } else {
        alert('Nenhum dado encontrado.');
      }
    };

    onMounted(() => {
      loadUserData()
    })

    return{
      userData
    }

  },
});
</script>


<template>
  <v-navigation-drawer
    app
    permanent
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :subtitle="userData?.email"
        :title="userData?.name"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-navigation-drawer {
  height: 100vh; /* Faz com que o sidebar ocupe toda a altura da tela */
}
</style>
