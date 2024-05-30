<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import localStorageService from '@/services/localStorageService';

export default defineComponent({
  name: 'Sidebar',
  setup(){
    const userData = ref<{ name: string; email: string } | null>(null);
    const router = useRouter();
    const route = useRoute();

    const loadUserData = () => {
      const data = localStorageService.getUserData();
      if (data) {
        userData.value = data;
      } else {
        alert('Nenhum dado encontrado.');
      }
    };

    const navigate = (path: string) => {
      router.push({ path });
    };

    onMounted(() => {
      loadUserData();
    });

    return {
      userData,
      navigate,
      route
    };
  },
});
</script>

<template>
  <v-navigation-drawer app permanent expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :subtitle="userData?.email"
        :title="userData?.name"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        prepend-icon="mdi-folder"
        title="My Files"
        value="myfiles"
        :class="{'selected-item': route.path === '/myfiles'}"
        @click="navigate('/myfiles')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
        :class="{'selected-item': route.path === '/shared'}"
        @click="navigate('/shared')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-star"
        title="Starred"
        value="starred"
        :class="{'selected-item': route.path === '/starred'}"
        @click="navigate('/starred')"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-navigation-drawer {
  height: 100vh; /* Faz com que o sidebar ocupe toda a altura da tela */
}

.v-list-item:hover {
  background-color: #FFA500;
  color: #333333;
}

.selected-item {
  background-color: #FFC04D;
  color: #333333;
}

.selected-item .v-icon {
  color: #FF8C00;
}
</style>
