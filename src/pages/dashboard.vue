<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/authService';


export default defineComponent({
  name: 'Dashboard',

  setup(){
    const router = useRouter();
    const loading = ref(true);

    onBeforeMount(async () => {
      {
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
  <v-container>
    <v-row>
      <v-col>
        <div v-if="loading">
          <h1>Carregando...</h1>
        </div>
        <div v-else>
          <h1>Dashboard</h1>
          <!-- Conteúdo do dashboard -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


