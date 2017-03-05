import TypeChart from './data/typeChart';

export default class Damage {
    constructor(attack, player, opponent) {
        this.attack = attack;
        this.attacking = player;
        this.defending = opponent;

        this.typeChart = TypeChart;
    }

    power(otherPokemonType) {
        return Math.floor(this.calculateStatsPower() * this.calculateStab() * this.calculateTypeEffect(otherPokemonType) * this.calculateCritical(otherPokemonType) * this.calculateOther() * this.getRandomFactor())
    }

    calculateStatsPower() {
        // Calculate base power based on the pokemon's level
        const levelPowerbase = ((2 * this.attacking.stats.level) / 5) + 2;

        // Calculate the attack power based on stats
        const statPowerbase = this.attacking.stats.attack * (this.attack.power / this.defending.stats.defense);

        // Raw damage
        return ((levelPowerbase * statPowerbase) / 50) + 2;
    }

    // If the attack type is one of the attacking's types
    // do 50% more damage
    calculateStab() {
        return (this.attacking.type.indexOf(this.attack.type) > -1) ? 1.5 : 1
    }

    // Attacks will be 85%-100% effective
    getRandomFactor() {
        return Math.floor(Math.random() * (100 - 85) + 85) / 100;
    }

    // Consult the type chart and build a multiplier
    calculateTypeEffect(otherPokemonType) {
        // If we haven't defined the type in the typeChart return normal damage
        if (typeof this.typeChart[this.attack.type] == 'undefined')
            return 1;

        // Here we'll build the multiplier in
        let effectTotal = 1;

        // In case of immune we'll just set this to true
        let noEffect = false;

        // Let's loop over every type the defending pokemon has
        this.defending.type.forEach((type) => {

            // Let's loop offer the effects that attack type has on other types
            Object.keys(this.typeChart[this.attack.type]).forEach((effect) => {
                const otherTypes = this.typeChart[this.attack.type][effect];

                // If the effect has types defined and the defending pokemon's type is listed
                if(otherTypes.length > 0 && otherTypes.indexOf(type) > -1)
                {
                    // Figure out what effect to apply
                    switch(effect)
                    {
                        case 'immunes':
                            noEffect = true;
                            effectTotal = 0;
                            break;
                        // Reduce the attack's damage
                        case 'weaknesses':
                            effectTotal = effectTotal * 0.5;
                            break;
                        // Increase the attack's effect
                        case 'strengths':
                            if(effectTotal < 2)
                                effectTotal = effectTotal * 2;
                            else
                                effectTotal = 2;
                            break;
                    }
                }
            }, this);
        });

        // Defending pokemon is immune
        if (noEffect || effectTotal == 0)
        {
            Vuemit.fire(otherPokemonType+'.attack.effective', 'Had no effect');
            return 0;
        }

        if(effectTotal == 0.5)
        {
            Vuemit.fire(otherPokemonType+'.attack.effective', 'Not very effective');
        }
        else if(effectTotal > 1)
        {
            Vuemit.fire(otherPokemonType+'.attack.effective', 'Very effective');
        }

        // Return the multiplier
        return effectTotal;
    }

    calculateCritical(otherPokemonType) {
        const random = Math.floor(Math.random() * 255);
        const probability = (this.attack.type == 'normal') ? this.attacking.stats.speed / 512 : this.attacking.stats.speed / 256;

        // Seems like we've got a critical hit
        if (random < probability) {
            Vuemit.fire(otherPokemonType+'.attack.effective', 'Critical hit!');
            // Lower leveled pokemon will have a smaller percentage of bonus
            return ((this.attacking.stats.level * 2) + 5) / (this.attacking.stats.level + 5);
        }

        // Normal attack power
        return 1;
    }

    // Not implemented
    calculateOther() {
        return 1;
    }
}