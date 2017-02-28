// Courtesy of http://bulbapedia.bulbagarden.net/
export default {
    normal: {
        attack: {
            rock: -0.5,
            ghost: 0,
        },
        defense: {
            fight: 2,
            ghost: 0,
        },

    },
    rock: {
        attack: {
            bug: 2,
            fire: 2,
            flying: 2,
            ice: 2,
            fight: -0.5,
            ground: -0.5,
        },
        defense: {
            fire: .5,
            flying: .5,
            normal: .5,
            poison: .5,
            fight: 2,
            grass: 2,
            ground: 2,
            water: 0
        },
    },
    fire: {
        attack: {
            bug: 2,
            grass: 2,
            ice: 2,
            dragon: -.5,
            fire: -.5,
            rock: -.5,
            water: -.5
        },
        defense: {
            bug: .5,
            fire: .5,
            grass: .5,
            ground: 2,
            rock: 2,
            water: 2
        }
    },
    electric: {
        attack: {
            flying: 2,
            water: 2,
            dragon: -.5,
            electric: -.5,
            grass: -.5
        },
        defense: {
            electric: .5,
            flying: .5,
            ground: 2
        }
    },
    ghost: {
        attack: {
            ghost: 2,
            normal: 0,
            psychic: 0
        },
        defense: {
            bug: .5,
            poison: .5,
            ghost: 2,
            normal: 0,
            fight: 0
        }
    },
    psychic: {
        attack: {
            fight: 2,
            poison: 2,
            psychic: -.5
        },
        defense: {
            fight: .5,
            psychic: .5,
            bug: 2,
            ghost: 0
        }
    }
}