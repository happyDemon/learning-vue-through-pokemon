// Courtesy of https://github.com/filipekiss/pokemon-type-chart
export default {
    "normal": {"immunes": ["ghost"], "weaknesses": ["rock", "steel"], "strengths": []},

    "fire": {
        "immunes": [],
        "weaknesses": ["fire", "water", "rock", "dragon"],
        "strengths": ["grass", "ice", "bug", "steel"]
    },

    "water": {
        "immunes": [],
        "weaknesses": ["water", "grass", "dragon"],
        "strengths": ["fire", "ground", "rock"]
    },

    "electric": {
        "immunes": ["ground"],
        "weaknesses": ["electric", "grass", "dragon"],
        "strengths": ["water", "flying"]
    },

    "grass": {
        "immunes": [],
        "weaknesses": ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
        "strengths": ["water", "ground", "rock"]
    },

    "ice": {
        "immunes": [],
        "weaknesses": ["fire", "water", "ice", "steel"],
        "strengths": ["grass", "ground", "flying", "dragon"]
    },

    "fighting": {
        "immunes": ["ghost"],
        "weaknesses": ["poison", "flying", "psychic", "bug", "fairy"],
        "strengths": ["normal", "ice", "rock", "dark", "steel"]
    },

    "poison": {
        "immunes": ["steel"],
        "weaknesses": ["poison", "ground", "rock", "ghost"],
        "strengths": ["grass", "fairy"]
    },

    "ground": {
        "immunes": ["flying"],
        "weaknesses": ["grass", "bug"],
        "strengths": ["fire", "electric", "poison", "rock", "steel"]
    },

    "flying": {
        "immunes": [],
        "weaknesses": ["electric", "rock", "steel"],
        "strengths": ["grass", "fighting", "bug"]
    },
    "psychic": {"immunes": ["dark"], "weaknesses": ["psychic", "steel"], "strengths": ["fighting", "poison"]},

    "bug": {
        "immunes": [],
        "weaknesses": ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
        "strengths": ["grass", "psychic", "dark"]
    },

    "rock": {
        "immunes": [],
        "weaknesses": ["fighting", "ground", "steel"],
        "strengths": ["fire", "ice", "flying", "bug"]
    },
    "ghost": {"immunes": ["normal"], "weaknesses": ["dark"], "strengths": ["psychic", "ghost"]},
    "dragon": {"immunes": ["fairy"], "weaknesses": ["steel"], "strengths": ["dragon"]},
    "dark": {"immunes": [], "weaknesses": ["fighting", "dark", "fairy"], "strengths": ["psychic", "ghost"]},

    "steel": {
        "immunes": [],
        "weaknesses": ["fire", "water", "electric", "steel"],
        "strengths": ["ice", "rock", "fairy"]
    },

    "fairy": {
        "immunes": [],
        "weaknesses": ["fire", "poison", "steel"],
        "strengths": ["fighting", "dragon", "dark"]
    }
}