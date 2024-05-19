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
};
