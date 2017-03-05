import Vue from 'vue'

window.Vue = Vue;
window.Vuemit = require('vuemit');

// Import Velocity & its base animations
import 'velocity-animate'
import 'velocity-animate/velocity.ui'

import TransitionAnimations from './animations';

TransitionAnimations.register(Vue);

import Store from './store';

import App from './App.vue'

new Vue({
    el: '#app',
    store: Store,
    render: h => h(App)
});