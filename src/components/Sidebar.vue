<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import localStorageService from '@/services/localStorageService';
import authService from '@/services/authService';

export default defineComponent({
  name: 'Sidebar',
  setup(){
    const userData = ref<{ name: string; email: string } | null>(null);
    const router = useRouter();
    const route = useRoute();

    const loadUserData = () => {
      const data = localStorageService.getUserData()
      if (data) {
        userData.value = data
      } else {
        alert('Nenhum dado encontrado.');
      }
    };

    const logout = async () => {
      await authService.logout();
      router.push('/login');
    };

    const navigate = (path: string) => {
      router.push({ path })
    };

    onMounted(() => {
      loadUserData()
    });

    return {
      userData,
      navigate,
      logout,
      route
    };
  },
});
</script>

<template>
  <v-navigation-drawer app permanent expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-icon="mdi-account"
        :subtitle="userData?.email"
        :title="userData?.name"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        :active="route.path === '/dashboard'"
        prepend-icon="mdi-apps-box"
        title="Início"
        value="dashboard"
        :class="{'selected-item': route.path === '/dashboard'}"
        @click="navigate('/dashboard')"
      ></v-list-item>
      <v-list-item
        :active="route.path === '/arenas'"
        prepend-icon="mdi-city-variant"
        title="Arenas"
        value="arenas"
        :class="{'selected-item': route.path === '/arenas'}"
        @click="navigate('/arenas')"
      ></v-list-item>
      <v-list-item
        :active="route.path === '/requests'"
        prepend-icon="mdi-application-edit"
        title="Comandas"
        value="requests"
        :class="{'selected-item': route.path === '/requests'}"
        @click="navigate('/requests')"
      ></v-list-item>
      <v-list-item
        :active="route.path === '/products'"
        prepend-icon="mdi-package-variant-closed"
        title="Produtos"
        value="products"
        :class="{'selected-item': route.path === '/products'}"
        @click="navigate('/products')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-cog"
        :active="route.path === '/users'"
        title="Configurações de Usuário"
        value="users"
        :class="{'selected-item': route.path === '/users'}"
        @click="navigate('/users')"
      ></v-list-item>

    </v-list>


    <template v-slot:append>
            <v-list-item
            prepend-icon="mdi-logout"
            @click="logout"
            title="Sair"
            >
        </v-list-item>
        </template>


  </v-navigation-drawer>
</template>

<style scoped>
.v-navigation-drawer {
  height: 100vh; /* Faz com que o sidebar ocupe toda a altura da tela */
}

.v-list-item:hover {
  background-color: #FFA500;
  color: black;
}

.selected-item {
  background-color: #FFC04D;
  color: black;
  font-weight: bold;
}

.selected-item .v-icon {
  color: #FF8C00;
}
</style>
