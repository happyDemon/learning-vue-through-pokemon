<template>
    <div>
        <div :class="hpBoxClass">
            <img :id="pokemonImageId" v-if="alive" :src="pokemon.image" class="pokemon-bottom"/>
        </div>
        <div :class="boxClass">
            <h2 class="pokemon">{{pokemon.name}}</h2>
            <div :class="hpBarClass">
                <div :style="hpBarStyle" class="hp-bar-fill"></div>
            </div>
            <h4 class="level">Lvl. {{pokemon.level}}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['pokemon', 'position', 'type'],
        data(){
            return {
                // Inverse pokemon type
                opponent: this.type == 'player' ? 'opponent' : 'player',
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
                // Show red
                let color = '#FF0061';

                // Show green if HP >= 70%
                if(this.pokemon.hp >= 70)
                {
                    color = '#1CB06F';
                }
                // Show yellow if HP >= 30%
                else if(this.pokemon.hp >= 30)
                {
                    color = '#FF8800';
                }

                // Return the style binding
                return {
                    width: String(this.pokemon.hp) + '%',
                    background: color
                }
            },
            alive(){
                return this.pokemon.hp > 0;
            }
        },
    }
</script>