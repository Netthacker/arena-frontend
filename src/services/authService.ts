import axiosInstance from './axiosInstance';
import localStorageService from './localStorageService';
import API_URL from './api';

export default {
  login(email: string, password: string) {
    return axiosInstance.post(`${API_URL}/sigin`, { email, password })
      .then(response => {
        if (response.data.token) {
          localStorageService.setToken(response.data.token);
        }
        return response.data;
      })
      .catch(error => {
        // Propaga o erro para ser tratado no componente de login
        throw error.response ? error.response.data : new Error('Erro desconhecido');
      });
  },
  logout() {
    return localStorageService.removeToken();
  },
  getToken() {
    return localStorageService.getToken();
  },
  async checkToken() {
    return await axiosInstance.get(`${API_URL}/user`)
    .then(response=>{
      if(response.data.data){
        localStorageService.setUserData(response.data.data)
      }
      return response.data
    })
    .catch(error => {
        // Propaga o erro para ser tratado no componente de login
        throw error.response ? error.response.data : new Error('Erro desconhecido');
      });
  },
};
