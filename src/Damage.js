import TypeChart from './data/typeChart';

export default class Damage {
    constructor(attack, player, opponent) {
        this.attack = attack;
        this.attacking = player;
        this.defending = opponent;

        this.typeChart = TypeChart;
    }

    power() {
        return Math.floor(this.calculateStatsPower() * this.calculateStab() * this.calculateTypeEffect() * this.calculateCritical() * this.calculateOther() * this.getRandomFactor())
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
    calculateTypeEffect() {
        // If we haven't defined the type in the typeChart return normal damage
        if (typeof this.typeChart[this.attack.type] == 'undefined')
            return 1;

        // Here we'll build the multiplier in
        let effect = 0;

        // In case of immune we'll just set this to true
        let noEffect = false;

        console.log(this.typeChart[this.attack.type]);

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
                            console.log('immune');
                            noEffect = true;
                            break;
                        // Reduce the attack's damage
                        case 'weaknesses':
                            console.log('weak')
                            // Only half the attack
                            if (effect == 0) {
                                effect = .5;
                            }
                            // remove half from an existing effect
                            else {
                                effect -= 0.5;
                            }
                            break;
                        // Increase the attack's effect
                        case 'strengths':
                            console.log('super effective');
                            // Just add the double attack
                            if (effect != .5) {
                                effect += 2;
                            }
                            // remove the half
                            else {
                                effect = 1.5;
                            }
                            break;
                    }
                }
            }, this);
        });

        // Defending pokemon is immune
        if (noEffect)
            return 0;

        // Normal attack
        if (effect == 0)
            return 1;

        // Return the multiplier
        return effect;
    }

    calculateCritical() {
        const random = Math.floor(Math.random() * 255);
        const probability = (this.attack.type == 'normal') ? this.attacking.stats.speed / 512 : this.attacking.stats.speed / 256;

        // Seems like we've got a critical hit
        if (random < probability) {
            console.log('Critical hit');
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