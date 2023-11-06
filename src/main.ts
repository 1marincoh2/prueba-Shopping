import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import './assets/styles.scss';
import 'primeflex/primeflex.css';


import App from './App.vue'
import BadgeDirective from 'primevue/badgedirective';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue'
import router from './router'
import store from './store';
import Tooltip from 'primevue/tooltip';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app')
app.directive('badge', BadgeDirective);
app.directive('tooltip', Tooltip);
