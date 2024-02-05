import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import store from './store/store';
import '@fortawesome/fontawesome-free/css/all.css';
import router from './router/router';


const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
