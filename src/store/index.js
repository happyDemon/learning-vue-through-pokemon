import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        pokedex: require('./data/pokedex').default,
        typeChart: require('./data/battle').default
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