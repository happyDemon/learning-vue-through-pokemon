// initial state
const state = {
    // We just need to reference the pokemon's id
    id: null,
}

// getters
const getters = {
    // Retrieve's the pokemon from the rootState
    pokemon(state, getters, rootState){
        return rootState.pokedex[state.id];
    },
    fightOptions(state, getters){
        return Object.keys(getters.pokemon.attacks);
    }
};

// mutations
const mutations = {
    // Set the active pokemon
    setPokemon (state, id) {
        state.id = id;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}