<style>
    .pokemon-image-enter-active {
        transition: all .5s ease;
    }

    .pokemon-image-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    /*  */
    .pokemon-image-enter {
        transform: translateY(10px);
        opacity: 0;
    }

    .pokemon-image-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>
<template>
    <div>
        <div :class="hpBoxClass">
            <transition-attack>
                <div v-if="attackEffect" class="battle-effectiveness">
                    {{attackEffect}}
                </div>
            </transition-attack>
            <transition appear name="pokemon-image">
                <img :id="pokemonImageId" v-if="alive" :src="image" class="pokemon-bottom"/>
            </transition>
        </div>
        <div :class="boxClass">
            <h2 class="pokemon">{{local.pokemon.name}}</h2>
            <div :class="hpBarClass">
                <div :style="hpBarStyle" class="hp-bar-fill"></div>
            </div>
            <h4 class="level">Lvl. {{local.pokemon.stats.level}}</h4>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex'
    import Damage from './Damage';

    export default {
        props: ['position', 'type'],
        data(){
            const effectTypeClass = this.type + '-effect';
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
                },
                attackEffect: false,
                attackEffectQueue: []
            };
        },
        computed: {
            hpBarStyle(){
                // Calculate the percentage of HP
                const HPBarPercentage = (this.local.hp / this.local.pokemon.stats.hp) * 100;

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
                return this.local.hp > 0;
            },
            ...mapState({
                local(state) {
                    return state[this.type]
                },
                opponent(state) {
                    return state[this.otherPokemon]
                }
            }),
            image(){
                switch (this.type) {
                    case 'player':
                        return this.local.pokemon.images.back;
                        break;
                    case 'opponent':
                        return this.local.pokemon.images.front;
                        break;
                }
            }
        },
        watch: {
            attackEffect(value, oldValue)
            {
                // If the battleEffect has been reset and we've got another one waiting in our queue
                if(value === false && this.attackEffectQueue.length > 0)
                {
                    // Show the effect from the queue
                    this.showAttackEffect(this.attackEffectQueue[0]);

                    // Remove the effect from the queue
                    this.attackEffectQueue.splice(0,1);
                }
            }
        },
        mounted(){
            Vuemit.listen(this.type+'.attack.effective', (effect) => {
                this.showAttackEffect(effect);
            });
        },
        methods: {
            ...mapMutations(['setHP']),
            /**
             * Performs an attack on the opponent
             */
            attack(attackName) {
                // If the pokemon is not alive, call faint (failsafe)
                if (!this.alive) {
                    Vuemit.fire('fainted', this.local.pokemon.name);
                    return;
                }

                // Show that the current pokemon is attacking
                Velocity(document.getElementById(this.pokemonImageId), 'callout.pulse');

                // Change attack text
                this.$parent.battleText = `${this.local.pokemon.name} used ${attackName}!`;


                // Wait .4 second to attack
                setTimeout(() => {

                    // Get the attack's power
                    const attackPower = this.calculateDamage(attackName);

                    if (attackPower > 0) {
                        // Show that the opponnet is receiving damage
                        Velocity(document.getElementById(this.otherPokemon + '-pokemon'), 'callout.bounce');
                    }

                    // If the attack power is greater than or equal to the opponents's hp
                    if (this.opponent.hp <= attackPower) {
                        // Set HP to 0
                        this.setHP({type: this.otherPokemon, hp: 0});

                        // Notify the parent that the opponent has fainted
                        Vuemit.fire('fainted', this.opponent.pokemon.name);
                        return;
                    }

                    // Otherwise reduce HP
                    this.setHP({type: this.otherPokemon, hp: this.opponent.hp - attackPower});

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
                const fightOptions = this.$store.getters[this.type + 'Attacks'];

                // Pick a random attack
                const attackKey = Math.floor(Math.random() * fightOptions.length);

                // Return the attack name
                return fightOptions[attackKey];
            },
            calculateDamage(attackName) {
                const attack = this.local.pokemon.attacks[attackName];

                const damage = new Damage(attack, this.local.pokemon, this.opponent.pokemon);

                return damage.power(this.otherPokemon);
            },
            showAttackEffect(effect)
            {
                // If there's already an attack effect, queue it
                if(this.attackEffect != false)
                {
                    this.attackEffectQueue.push(effect);
                    return;
                }

                // Show attack effect
                this.attackEffect = effect;

                // Reset the attack effect
                setTimeout(() => {
                    this.attackEffect = false;
                }, 800)
            }
        }
    }
</script>