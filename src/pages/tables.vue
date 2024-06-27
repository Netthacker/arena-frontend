<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';

import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Lista from '@/components/Lista.vue';

import tableService from '../services/tableService';
import arenaService from '../services/arenaService';
import utils from '../plugins/utils';

export default defineComponent({
  name: 'Tables',
  components: {
    Header,
    Sidebar,
    Lista,
  },

  setup(){
    const router = useRouter();
    const loading = ref(true);

    const mesas = ref([] as Array<Record<string, any>>);
    const tableItems = ref([] as Array<Record<string, any>>);
    const arenas = ref([] as Array<Record<string,any>>);
    const arenaItems = ref([] as Array<Record<string,any>>);

    const headerMapping = {
      name: 'Nome',
      arenainventory_id: 'Arena',
      created_at: 'Criado em',
      updated_at: 'Atualizado em'
    };

    const tableHeaders = computed(() => {
      const keys = Object.keys(headerMapping);
      const headers = keys.map(key => ({
        title: headerMapping[key] || key.charAt(0).toUpperCase() + key.slice(1),
        key
      }));
      headers.push({ title: 'Ações', key: 'actions', sortable: false });
      return headers;
    });

    onBeforeMount(async () => {
      try {
        formatingTables();

        loading.value = false;
      } catch (error) {
        router.push('/login');
      }
    });

    watch(mesas, (newTables: any) => {
      tableItems.value = toRaw(newTables);
    });
    watch(arenas,(newArenas:any)=>{
      arenaItems.value = toRaw(newArenas);
    });

    const formatingTables = async ()=>{
        mesas.value = await tableService.list();
        arenas.value = await arenaService.list();
        mesas.value.forEach(mesa => {
          mesa.created_at = utils.formatDate(mesa.created_at);
          mesa.updated_at = utils.formatDate(mesa.updated_at);
        });
    };

    const createItem = async (item: Record<string, any>) => {
        const newItem = await tableService.create(item);
        console.log(newItem)
        if(newItem.error === ''){
          await formatingTables()
        }
    };

    const updateItem = async ({ index, item }: { index: number, item: Record<string, any> }) => {
        console.log(index);
        const updatedItem = await tableService.update({ index, item });
        if(updatedItem.error ===''){
          await formatingTables()
        }
    };

    const deleteItem = async (index: number) => {
        const deleted = await tableService.delete(mesas.value[index].id);
        if (deleted.error ===''){
          await formatingTables()
        }

    };

    return {
      loading,
      tableHeaders,
      tableItems,
      createItem,
      updateItem,
      deleteItem,
      arenaItems
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
              <Header name="Mesas"/>
            </v-col>
          </v-row>
        </v-container>
        <v-main class="dashboard-main">
          <v-container>
            <Lista
              :headers="tableHeaders"
              :items="tableItems"
              :arenas="arenaItems"
              namePopup="Criar Mesas"
              @create-item="createItem"
              @update-item="updateItem"
              @delete-item="deleteItem"
            />
          </v-container>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<style scoped>
.dashboard-main {
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}
</style>
