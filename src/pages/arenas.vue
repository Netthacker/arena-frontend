<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Lista from '@/components/Lista.vue';

import arenaService from '../services/arenaService';
import utils from '../plugins/utils';

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

    const arenas = ref([] as Array<Record<string, any>>);
    const tableItems = ref([] as Array<Record<string, any>>);

    const headerMapping = {
      name: 'Nome',
      created_at: 'Criado em ',
      updated_at: 'Atualizado em'
    };

    const tableHeaders = computed(() => {
        const keys = Object.keys(arenas.value[0]);
        const headers = keys.map(key => ({ title: headerMapping[key] || key.charAt(0).toUpperCase() + key.slice(1),
          key }))
        headers.push({ title: 'Ações', key: 'actions', sortable: false });
        return headers;
    });

    onBeforeMount(async () => {
      {
        //admin@teste.com
        //123456
          try{
            arenas.value = await arenaService.list();
            arenas.value.forEach(arena => {
              arena.created_at = utils.formatDate(arena.created_at);
              arena.updated_at = utils.formatDate(arena.updated_at);
            });

            loading.value = false;

          }catch(error){
            router.push('/login');
          }
      }
    });

    watch(arenas, (newArenas:any) => {
      tableItems.value = toRaw(newArenas);
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


