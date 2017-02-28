import Vue from 'vue'

window.Vue = Vue;

window.Vuemit = require('vuemit');

import Store from './store';


import App from './App.vue'

new Vue({
    el: '#app',
    store: Store,
    render: h => h(App)
});