<template>
    <div class="battle-scene">
        <pokemon position="top" type="opponent" ref="opponent"></pokemon>
        <pokemon position="bottom" type="player" ref="player"></pokemon>

        <div class="bottom-menu">
            <div class="battle-text text-box-left">
                {{battleText}}
            </div>
            <div class="text-box-right">
                <div v-if="menu == 'options'" id="battleOptions">
                    <h4 @click="processOption(1)" class="battle-text-top-left">{{battleOptions[0]}}</h4>
                    <h4 @click="processOption(2)" class="battle-text-top-right">{{battleOptions[1]}}</h4>
                    <h4 @click="processOption(3)" class="battle-text-bottom-left">{{battleOptions[2]}}</h4>
                    <h4 @click="processOption(4)" class="battle-text-bottom-right">{{battleOptions[3]}}</h4>
                </div>
                <div v-if="menu == 'attack'" id="fightOptions">
                    <h4 @click="processAttack(fightOptions[0])" class="battle-text-top-left">{{fightOptions[0]}}</h4>
                    <h4 @click="processAttack(fightOptions[1])" class="battle-text-top-right">{{fightOptions[1]}}</h4>
                    <h4 @click="processAttack(fightOptions[2])" class="battle-text-bottom-left">{{fightOptions[2]}}</h4>
                    <h4 @click="processAttack(fightOptions[3])" class="battle-text-bottom-right">
                        {{fightOptions[3]}}</h4>
                </div>
                <div v-if="menu == 'end'" id="endOptions">
                    <h4 @click="resetBattle" class="battle-text-top-left">Yes</h4>
                    <h4 class="battle-text-top-right">No</h4>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
    import { mapState, mapActions, mapGetters } from 'vuex'
    import Pokemon from './Pokemon.vue';

    export default {
        components: {
            Pokemon
        },
        data(){
            return {
                battleText: "What will Charizard do?",
                battleOptions: ["Fight", "Pokemon", "Item", "Run"],
                menu: 'options',
            };
        },
        computed: {
                ...mapState({
                    player(state) { state.player },
                    opponent(state) { state.opponent }
            }),
                ...mapGetters({
                    fightOptions: 'player/fightOptions'
                })
        },
        created(){
            // Set the player pokemon
            const playerId = Math.floor(Math.random() * this.$store.state.pokedex.length);
            this.$store.commit('player/setPokemon', playerId);

            // Set the opponent pokemon
            const opponentId = (playerId == 0) ? 1 : playerId-1;
            this.$store.commit('opponent/setPokemon', opponentId);
        },
        mounted(){
            Vuemit.listen('player.attack', (attackName) => {
                this.$refs.player.attack(attackName);
            });
            Vuemit.listen('opponent.attack', () => {
                this.$refs.opponent.attack(this.$refs.opponent.pickRandomAttack());
            });
            Vuemit.listen('attack.completed', () => {
                this.battleText = "What will " + this.$store.getters['player/pokemon'].name + " do?"
            });
            Vuemit.listen('fainted', (pokemonFainted) => {
                this.battleText = `${pokemonFainted} fainted! Play again?`;
                this.menu = 'end';
            });

            console.log(this.$store)
        },
        methods: {
            processOption(option) {
                switch (option) {
                    case 1:
                        //handle fight

                        // Show the attack menu
                        this.menu = 'attack';
                        break;
                    case 2:
                        // Switch pokemon

                        // After 3 second we'll want to revert the text
                        setTimeout(() => {
                            this.battleText = "What will " + this.player.pokemon.name + " do?"
                        }, 2000);

                        // Not implemented
                        this.battleText = "You're our only hope " + this.player.pokemon.name + "!"

                        break;
                    case 3:
                        //handle item

                        // After 2 seconds revert the text
                        setTimeout(() => {
                            this.battleText = "What will " + this.player.pokemon.name + " do?"
                        }, 2000);

                        // Not implemented
                        this.battleText = "No items in bag."
                        break;
                    case 4:
                        //handle run

                        // After 2 seconds revert the text
                        setTimeout(() => {
                            this.battleText = "What will " + this.player.pokemon.name + " do?"
                        }, 2000);

                        // Not implemented
                        this.battleText = "Can't escape."
                        break;
                }
            },
            resetBattle() {
                //reset data to start new game
                this.menu = 'options';
                // Use a string literal to nicely render variables in your strings
                // https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals
                this.battleText = `What will ${this.$store.getters['player/pokemon'].name} do?`;

                this.resetPokemon();
            },
            processAttack(attackName) {
                Vuemit.fire('player.attack', attackName);
            },
            ...mapActions({
                resetPokemon: 'reset'
            })
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
    @import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow');

    html, body {
        height: 100%;
        background: #3C7ACD;
    }

    body {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        position: relative;
        margin-top: 10px;
        color: white;
        text-align: center;
        font-size: 28px;
        text-transform: uppercase;
        font-family: "Roboto Condensed";
    }

    .battle-scene {
        position: relative;
        margin: auto;
        display: block;
        margin-top: 3%;
        width: 600px;
        height: 420px;
        background: #F8F8F8;
        z-index: 1;
    }

    .box-top-left {
        position: absolute;
        width: 40%;
        height: 15%;
        border-radius: 10px;
        top: 8%;
        left: 8%;
        background: #F8F8D8;
        border: 6px solid #506860;
    }

    .hp-bar-top {
        position: absolute;
        bottom: 16%;
        height: 20%;
        width: 70%;
        left: 10%;
        border-radius: 20px;
        background: grey;
        opacity: 0.5;
    }

    .hp-bar-bottom {
        position: absolute;
        bottom: 32%;
        height: 20%;
        width: 70%;
        left: 10%;
        border-radius: 20px;
        background: grey;
        opacity: 0.5;
    }

    .hp-bar-fill {
        position: absolute;
        height: 100%;
        border-radius: 20px;
        background: #FF8800;
        -webkit-transition: width 1s ease-in-out;
        -moz-transition: width 1s ease-in-out;
        -o-transition: width 1s ease-in-out;
        transition: width 1s ease-in-out;
    }

    .box-top-right {
        position: absolute;
        width: 40%;
        height: 25%;
        border-radius: 50%;
        top: 25%;
        right: 8%;
        background: #E0E0E0;
    }

    .pokemon-top {
        height: 150%;
        width: 50%;
        position: absolute;
        top: -80%;
        left: 25%;
    }

    .pokemon-bottom {
        height: 150%;
        width: 50%;
        position: absolute;
        top: -75%;
        left: 25%;
    }

    .box-bottom-left {
        position: absolute;
        width: 40%;
        height: 25%;
        border-radius: 50%;
        bottom: 15%;
        left: 8%;
        background: #E0E0E0;
    }

    .box-bottom-right {
        position: absolute;
        width: 38%;
        height: 20%;
        border-radius: 10px;
        bottom: 20%;
        right: 8%;
        background: #F8F8D8;
        border: 6px solid #506860;
        z-index: 2;
    }

    .pokemon {
        text-align: left;
        margin-left: 10%;
        margin-top: 5%;
        opacity: 0.7;
        font-size: 18px;
        font-family: "Roboto Condensed";
    }

    .level {
        position: absolute;
        right: 8%;
        top: -11%;
        opacity: 0.7;
        font-size: 16px;
        font-family: "Roboto Condensed";
    }

    .hp {
        position: absolute;
        right: 8%;
        bottom: -20%;
        opacity: 0.7;
        font-size: 16px;
        font-family: "Roboto Condensed";
    }

    .bottom-menu {
        position: absolute;
        width: 98%;
        bottom: 0%;
        height: 19%;
        background: #285068;
        z-index: 1;
        border: solid 6px #CEB46D;
    }

    .text-box-left {
        position: absolute;
        width: 50%;
        left: 0%;
        height: 95%;

    }

    .text-box-right {
        position: absolute;
        width: 40%;
        top: -6%;
        right: -1%;
        height: 98%;
        background: #F8F8F8;
        border: solid 6px #6F677F;

    }

    .battle-text {
        margin-top: 3%;
        margin-left: 5%;
        opacity: 0.95;
        font-size: 18px;
        color: white;
        text-align: left;
        font-family: "PT Sans Narrow";
    }

    .battle-text-top-left {
        opacity: 0.95;
        position: absolute;
        font-size: 22px;
        color: #333333;
        top: -30%;
        left: 10%;
        text-align: left;
        font-family: "PT Sans Narrow";
        cursor: pointer;
    }

    .battle-text-bottom-left {
        opacity: 0.95;
        position: absolute;
        font-size: 22px;
        color: #333333;
        bottom: -30%;
        left: 10%;
        text-align: left;
        font-family: "PT Sans Narrow";
        cursor: pointer;
    }

    .battle-text-top-right {
        opacity: 0.95;
        position: absolute;
        font-size: 22px;
        color: #333333;
        top: -30%;
        right: 21%;
        text-align: left;
        font-family: "PT Sans Narrow";
        cursor: pointer;
    }

    .battle-text-bottom-right {
        opacity: 0.95;
        position: absolute;
        font-size: 22px;
        color: #333333;
        bottom: -30%;
        right: 20%;
        text-align: left;
        font-family: "PT Sans Narrow";
        cursor: pointer;
    }

    @media all and (max-width: 600px) {
        .battle-scene {
            position: relative;
            margin: auto;
            display: block;
            margin-top: 3%;
            width: 400px;
            height: 280px;
            background: #F8F8F8;
            z-index: 1;
        }

        .title {
            position: absolute;
            top: -33%;
            left: 7.5%;
            color: white;
            text-align: center;
            font-size: 22px;
            text-transform: uppercase;
            font-family: "Roboto Condensed";
        }

        .pokemon {
            text-align: left;
            margin-left: 11%;
            margin-top: 5%;
            opacity: 0.7;
            font-size: 14px;
            font-family: "Roboto Condensed";
        }

        .level {
            position: absolute;
            right: 5%;
            top: -13%;
            opacity: 0.7;
            font-size: 10px;
            font-family: "Roboto Condensed";
        }

        .hp {
            position: absolute;
            right: 8%;
            bottom: -20%;
            opacity: 0.7;
            font-size: 11px;
            font-family: "Roboto Condensed";
        }

        .battle-text-top-left {
            opacity: 0.95;
            position: absolute;
            font-size: 14px;
            color: #333333;
            top: -30%;
            left: 10%;
            text-align: left;
            font-family: "PT Sans Narrow";
            cursor: pointer;
        }

        .battle-text-bottom-left {
            opacity: 0.95;
            position: absolute;
            font-size: 14px;
            color: #333333;
            bottom: -30%;
            left: 10%;
            text-align: left;
            font-family: "PT Sans Narrow";
            cursor: pointer;
        }

        .battle-text-top-right {
            opacity: 0.95;
            position: absolute;
            font-size: 14px;
            color: #333333;
            top: -30%;
            right: 21%;
            text-align: left;
            font-family: "PT Sans Narrow";
            cursor: pointer;
        }

        .battle-text-bottom-right {
            opacity: 0.95;
            position: absolute;
            font-size: 14px;
            color: #333333;
            bottom: -30%;
            right: 20%;
            text-align: left;
            font-family: "PT Sans Narrow";
            cursor: pointer;
        }

        .battle-text {
            margin-top: 1%;
            margin-left: 5%;
            opacity: 0.95;
            font-size: 10px;
            color: white;
            text-align: left;
            font-family: "PT Sans Narrow";
        }

    }

</style>
