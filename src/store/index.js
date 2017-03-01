import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// Retrieve the pokedex
import PokeDex from './data/pokedex';

export default new Vuex.Store({
    // Define the state
    state: {
        pokedex: PokeDex,
        opponent: {
            pokemon: {},
            hp: 0
        },
        player: {
            pokemon: {},
            hp: 0
        }
    },
    getters: {
        // Retrieve a list of attack names from the opponent
        // $store.getters.opponentAttacks
        opponentAttacks(state) {
            return Object.keys(state.player.pokemon.attacks);
        },
        // Retrieve a list of attack names from the player
        // $store.getters.playerAttacks
        playerAttacks(state) {
            return Object.keys(state.player.pokemon.attacks);
        }
    },
    mutations: {
        // The payload should always be an object with a 'type' and 'hp' property
        // commit('setHP', {type: 'player', hp: 6})
        setHP(state, {type, hp})
        {
            state[type].hp = hp;
        },
        // Assign the opponent a pokemon based on a pokedexId
        // commit('setOpponentPokemon', pokedexId)
        setOpponentPokemon(state, pokedexId)
        {
            state.opponent.pokemon = state.pokedex[pokedexId];
            state.opponent.hp = state.pokedex[pokedexId].stats.hp;
        },
        // Assign the player a pokemon based on a pokedexId
        // commit('setPlayerPokemon', pokedexId)
        setPlayerPokemon(state, pokedexId)
        {
            state.player.pokemon = state.pokedex[pokedexId];
            state.player.hp = state.pokedex[pokedexId].stats.hp;
        },
        // Reset a battle, this means choosing new pokemon with ful HP
        // commit('reset')
        reset({state, commit}) {
            // Build an array with all the pokedex keys
            let pokedexKeys = [];
            for(let i=0; i<state.pokedex.length;i++)
            {
                pokedexKeys.push(i);
            }

            // Select a random pokedex entry & set the player pokemon
            const playerPokemonId = Math.floor(Math.random() * pokedexKeys.length)
            commit('setPlayerPokemon', playerPokemonId);

            // Remove the selected key
            pokedexKeys.splice(playerPokemonId, 1);

            // Select a random pokedex entry & set the opponent pokemon
            const opponentPokemonId = Math.floor(Math.random() * pokedexKeys.length)
            commit('setOpponentPokemon', opponentPokemonId);
        }
    },
});