import Vue from 'vue'

window.Vue = Vue;
window.Vuemit = require('vuemit');

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});