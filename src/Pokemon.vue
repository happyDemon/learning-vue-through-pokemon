<template>
    <div>
        <div :class="hpBoxClass">
            <img :id="pokemonImageId" v-if="alive" :src="image" class="pokemon-bottom"/>
        </div>
        <div :class="boxClass">
            <h2 class="pokemon">{{pokemon.name}}</h2>
            <div :class="hpBarClass">
                <div :style="hpBarStyle" class="hp-bar-fill"></div>
            </div>
            <h4 class="level">Lvl. {{pokemon.stats.level}}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['position', 'type'],
        data(){
            return {
                // Inverse pokemon type
                otherPokemon: this.type == 'player' ? 'opponent' : 'player',
                // Pokemon image id (handy if needed in the future for applying effects)
                pokemonImageId: this.type + '-pokemon',
                // The main box's class, based on the position
                boxClass: {
                    'box-top-left': this.position == 'top',
                    'box-bottom-right': this.position == 'bottom',
                },
                // The HP box's class, based on the position
                hpBoxClass: {
                    'box-top-right': this.position == 'top',
                    'box-bottom-left': this.position == 'bottom',
                },
                // The HP bar's class, based on the position
                hpBarClass: {
                    'hp-bar-top': this.position == 'top',
                    'hp-bar-bottom': this.position == 'bottom',
                }
            };
        },
        computed: {
            hpBarStyle(){
                // Calculate the percentage of HP
                const HPBarPercentage = (this.pokemon.hp / this.pokemon.stats.hp) * 100;

                // Show red
                let color = '#FF0061';

                // Show green if HP >= 70%
                if (HPBarPercentage >= 70) {
                    color = '#1CB06F';
                }
                // Show yellow if HP >= 30%
                else if (HPBarPercentage >= 30) {
                    color = '#FF8800';
                }

                // Return the style binding
                return {
                    width: String(HPBarPercentage) + '%',
                    background: color
                }
            },
            alive(){
                return this.pokemon.hp > 0;
            },
            pokemon(){
                return this.$store.getters[this.type + '/pokemon'];
            },
            opponent(){
                return this.$store.getters[this.otherPokemon + '/pokemon'];
            },
            image(){
                switch (this.type) {
                    case 'player':
                        return this.pokemon.images.back;
                        break;
                    case 'opponent':
                        return this.pokemon.images.front;
                        break;
                }
            }
        },
        methods: {
            /**
             * Performs an attack on the opponent
             */
            attack(attackName) {
                // If the pokemon is not alive, call faint (failsafe)
                if (!this.alive) {
                    Vuemit.fire('fainted', this.pokemon.name);
                    return;
                }

                // Change attack text
                this.$parent.battleText = `${this.pokemon.name} used ${attackName}!`;


                // Wait a second to reduce HP
                setTimeout(() => {
                    // Get the attack's power
                    const attackPower = this.calculateDamage(attackName);

                    // If the attack power is greater than or equal to the opponents's hp
                    if (this.opponent.hp <= attackPower) {
                        // Set HP to 0
                        this.$store.commit('setHP', {id: this.$store.state[this.otherPokemon].id, hp: 0});

                        // Notify the parent that the opponent has fainted
                        Vuemit.fire('fainted', this.opponent.name);
                        return;
                    }

                    // Otherwise reduce HP
                    this.$store.commit('setHP', {id: this.$store.state[this.otherPokemon].id, hp: this.opponent.hp-attackPower});

                    // Wait a little while for the HP bar animation to end and continue
                    setTimeout(() => {
                        // If the player just attacked, it's time for the opponent to do the same
                        // Otherwise we're done with this round.
                        const event = (this.type == 'player') ? 'opponent.attack' : 'attack.completed';
                        Vuemit.fire(event);
                    }, 1000)
                }, 400)
            },
            /**
             * Return the name of random attack
             */
            pickRandomAttack(){
                const fightOptions = this.$store.getters[this.type+'/fightOptions'];

                // Pick a random attack
                const attackKey = Math.floor(Math.random() * fightOptions.length);

                // Return the attack name
                return fightOptions[attackKey];
            },
            calculateDamage(attackName) {
                const attack = this.pokemon.attacks[attackName];

                // Calculate base power based on the pokemon's level
                const levelPowerbase = (2 * (this.pokemon.stats.level + 10)) / 250;

                // Calculate the attack power based on stats
                const statPowerbase = this.pokemon.stats.attack * (attack.power / this.opponent.stats.defense);

                // Raw damage
                const damage = (levelPowerbase * statPowerbase) + 2;

                // Get the type modifier
                const typeEffect = this.calculateTypeEffect(attack);

                // The attack has no effect
                if (typeEffect == 0)
                    return 0;

                // Randomise the result
                const random = Math.floor(Math.random() * (100 - 85 + 1) + 85) / 100;

                // build the modifier
                const modifier = this.calculateStab(attack) * random * typeEffect;

                // Return the damage
                return damage * modifier;
            },
            // If the attack type is on of the pokemon's types, increase by 50
            calculateStab(attack){
                return (this.pokemon.type.indexOf(attack.type) > -1) ? 1.5 : 1
            },
            // Calculate the effectiveness of the attack based on the opponent pokemon type
            calculateTypeEffect(attack)
            {
                const typeChart = this.$store.state.typeChart;

                // If we haven't defined the effectiveness
                if (typeof typeChart[attack.type] == 'undefined')
                    return 1;

                let effect = 0;
                let noEffect = false;

                this.opponent.type.forEach((type) => {
                    // If we have the attack type charted
                    if (typeof typeChart[attack.type].attack[type] != 'undefined') {
                        // Get the effectiveness from the chart
                        switch (typeChart[attack.type].attack[type]) {
                                // Not very effective
                            case -.5:
                                // Only half the attack
                                if (effect == 0) {
                                    effect = .5;
                                }
                                // just add
                                else {
                                    effect += typeChart[attack.type].attack[type];
                                }
                                break;
                                // Very effective
                            case 2:
                                // Just add
                                if (effect != .5) {
                                    effect += typeChart[attack.type].attack[type];
                                }
                                // remove the half
                                else {
                                    effect = 1.5;
                                }
                                break;
                                // Seems like it won't have any effect
                            case 0:
                                noEffect = true;
                                break;
                        }
                    }
                });

                if (noEffect)
                    return 0;

                // Normal attack
                if (effect == 0)
                    return 1;

                return effect;
            }
        }
    }
</script>