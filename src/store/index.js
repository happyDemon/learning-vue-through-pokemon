import Vue from 'vue'
import Vuex from 'vuex'

import PokeDex from './data/pokedex';
import TypeChart from './data/battle';

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        pokedex: PokeDex,
        typeChart: TypeChart
    },
    actions: {
        // Reset HP after battle
        reset({ commit, state }){
            commit('setHP', {hp: state.pokedex[state.player.id].stats.hp, id: state.player.id});
            commit('setHP', {hp: state.pokedex[state.opponent.id].stats.hp, id: state.opponent.id});
        }
    },
    mutations: {
        setHP(state, payload)
        {
            state.pokedex[payload.id].hp = payload.hp;
        },
    },
    modules: {
        player: require('./modules/player').default,
        opponent: require('./modules/opponent').default
    },
});