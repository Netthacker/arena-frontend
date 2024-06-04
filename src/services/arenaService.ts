import axiosInstance from './axiosInstance';
import localStorageService from './localStorageService';

const API_URL = 'http://arena.test/api';
//const API_URL = 'http://127.0.0.1:8000/api';

export default {

  async list(){
    return await axiosInstance.get(`${API_URL}/arenas`)
      .then(response =>{
        return response.data;
      })
      .catch(error =>{
        throw error.response ? error.response.data : new Error('Erro desconhecido');
      })
  },
};
