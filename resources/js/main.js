import './bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '@/assets/vendors/bootstrap-icons/bootstrap-icons.css';
import '@/assets/vendors/boxicons/css/boxicons.min.css';

import router from '@/routes';
import { createPinia } from "pinia";
import App from '@/App.vue';

import { createApp } from 'vue';


const app = createApp(App);
app
    .use(createPinia())
    // .use(VueSweetalert2)
    .use(router)
    .mount('#app')