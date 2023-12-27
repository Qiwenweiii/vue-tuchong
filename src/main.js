import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { imgLazy } from './directives/imgLazy';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// 自定义指令
app.directive('img-lazy', imgLazy);

app.mount('#app');
