/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import type {App} from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import login from '@/pages/login.vue';
import dashboard from '@/pages/dashboard.vue';

import authService from '../services/authService';


const routes = [
  {
    path: '/login',
    name:'login',
    component: login,
    meta: { requiresAuth: false, },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta: { requiresAuth: true, },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export {router}

export default function (app:App){
  app.use(router)
}
