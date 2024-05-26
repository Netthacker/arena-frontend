import axiosInstance from './axiosInstance';

const API_URL = 'http://arena.test/api';

export default {
  login(email: string, password: string) {
    return axiosInstance.post(`${API_URL}/sigin`, { email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user-token', response.data.token);
        }
        return response.data;
      })
      .catch(error => {
        // Propaga o erro para ser tratado no componente de login
        throw error.response ? error.response.data : new Error('Erro desconhecido');
      });
  },
  logout() {
    localStorage.removeItem('user-token');
  },
  getToken() {
    return localStorage.getItem('user-token');
  },
  async checkToken() {
    try {
      const response = await axiosInstance.get(`${API_URL}/user`);
      return response.data; // Se a resposta for bem-sucedida, o token é válido
    } catch (error) {
      // Se houver um erro, o token pode não ser válido
      throw error.response ? error.response.data : new Error('Erro desconhecido');
    }
  },
};
