// import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import ChooseDisk from '../components/ChooseDisk.vue';
import HomePage from '../components/HomePage.vue';
import OptionPage from '../components/OptionPage.vue';

// Vue.use(VueRouter);

const routes = [ 
  { name: 'chooseDick', path: '/', component: ChooseDisk },
  { name: 'home', path: '/home', component: HomePage },
  { name: 'option', path: '/option/:path/:type/:name/:nickname?', component: OptionPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
