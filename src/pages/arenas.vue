<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/authService';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Lista from '@/components/Lista.vue';


export default defineComponent({
  name: 'Arenas',
  components: {
    Header,
    Sidebar,
    Lista,
  },

  setup(){
    const router = useRouter();
    const loading = ref(true);

    const tableHeaders = ref([
      { title: 'Name', key: 'name', },
      { title: 'Email', key: 'email' },
      { title: 'Age', key: 'age' },
      { title: 'Actions', key: 'actions', sortable: false}
    ]);

    const tableItems = ref([
      { name: 'John Doe', email: 'john@example.com', age: 28 },
      { name: 'Jane Smith', email: 'jane@example.com', age: 34 },
      // Add more items as needed
    ]);

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
      tableHeaders,
      tableItems
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
              <Header name="Arenas"/>
            </v-col>
          </v-row>
        </v-container>
    <v-main class="dashboard-main">
      <v-container>
        <Lista :headers="tableHeaders" :items="tableItems"/>
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


