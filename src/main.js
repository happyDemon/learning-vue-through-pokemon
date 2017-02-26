import Vue from 'vue'

// We have to bind Vue to the window so vuemit can use it.
window.Vue = Vue;

// The same is true here, but because want to use it in all the components.
window.Vuemit = require('vuemit');

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
});