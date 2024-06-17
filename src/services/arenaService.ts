import axiosInstance from './axiosInstance';
import API_URL from './api';
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

  async create(item: Record<string, any>) {
    try {
      const response = await axiosInstance.post(`${API_URL}/arenas`, item);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erro desconhecido');
    }
  },

  async update({ index, item }: { index: number, item: Record<string, any> }){
    try{
      const response = await axiosInstance.put(`${API_URL}/arenas/${index}`,item)
      return response.data;
    }catch(error){
      throw error.response ? error.response.data : new Error('Erro desconhecido');
    }
  },

  async delete(id: number) {
    try {
      const response = await axiosInstance.delete(`${API_URL}/arenas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erro desconhecido');
    }
  },
};
