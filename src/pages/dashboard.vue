<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/authService';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import DashboardCard from '@/components/DashboardCard.vue';


export default defineComponent({
  name: 'Dashboard',
  components: {
    Header,
    Sidebar,
    DashboardCard,
  },

  setup(){
    const router = useRouter();
    const loading = ref(true);

    onBeforeMount(async () => {
      {
        //admin@teste.com
        //123456
          try{
            await authService.checkToken();
            loading.value = false;
          }catch(error){
            router.push('/login');
          }
      }
    });
    return {
      loading,
    };
  },

});
</script>
<template>
  <v-container v-if="loading">
    <v-row>
      <v-col>
        <h1>Carregando...</h1>
      </v-col>
    </v-row>
  </v-container>
  <v-app v-else>
    <v-row no-gutters>
      <v-col cols="auto">
    <Sidebar />
      </v-col>
   <v-col cols="12" style="padding: 0;">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="12">
              <Header name="Página Principal"/>
            </v-col>
          </v-row>
        </v-container>
    <v-main class="dashboard-main">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <DashboardCard
              title="Comandas em Aberto"
              subtitle="Número de comandas"
              content="15"
            />
          </v-col>
          <v-col cols="12" md="4">
            <DashboardCard
              title="Valor Recebido em Caixa"
              subtitle="Hoje"
              content="R$ 1.500,00"
            />
          </v-col>
          <v-col cols="12" md="4">
            <DashboardCard
              title="Total de Pedidos"
              subtitle="Hoje"
              content="30"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
   </v-col>
  </v-row>
  </v-app>
</template>

<style scoped>
.dashboard-main {
  padding-left: 20px; /* Ajusta conforme a largura do sidebar */
  padding-top: 20px; /* Ajusta conforme a altura do header */
  padding-right: 20px; /* Espaço à direita */
  padding-bottom: 20px; /* Espaço na parte inferior */
}
</style>


