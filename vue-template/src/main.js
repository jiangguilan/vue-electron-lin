import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
let electron = null;

Vue.config.productionTip = false

if (window.require) {
    electron = window.require('electron');
}

Vue.prototype.$electron = electron;
Vue.prototype.$axios = axios;

new Vue({
    render: h => h(App),
}).$mount('#app')
