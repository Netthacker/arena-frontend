<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/authService';
import Toast from './Toast.vue';

export default defineComponent({
  name: 'Login',
  components:{
    Toast
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const loading = ref(false)
    const router = useRouter();
    const toast = ref({
      message:'',
      status:'',
      show:true
    });

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const login = () => {
      authService.logout();
      loading.value=true;
      authService.login(email.value,password.value).then((response)=>{
        if(authService.getToken()){
          toast.value.show = true;
          toast.value.status = 'success';
          toast.value.message = 'Login realizado com sucesso!';
          setTimeout(() => {
            loading.value=false;
            toast.value.show = false;
            router.push('/dashboard');
          }, 2000);
        } else{
          toast.value.show = true;
          toast.value.status = 'fail';
          toast.value.message = response.error;

          setTimeout(() => {
            loading.value=false;
            toast.value.show = false;
          }, 2000);
        }
      }).catch(error =>{
          toast.value.show = true;
          toast.value.status = 'fail';
          toast.value.message = error.message;
          setTimeout(() => {
            loading.value=false;
            toast.value.show = false;
          }, 2000);
      })
    };

    return {
      email,
      password,
      showPassword,
      togglePasswordVisibility,
      login,
      toast,
      loading,
    };
  },
});
</script>


<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <Toast v-if="toast.message" :status="toast.status" :message="toast.message" :show="toast.show"/>
        <v-card>
          <v-card-title class="text-h5">Arena Online</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="E-mail"
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
                label="Senha"
                required
              ></v-text-field>
              <v-btn :loading="loading" type="submit" color="primary" class="mt-4" block>Entrar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


