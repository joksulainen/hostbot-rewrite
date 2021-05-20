module.exports = {
  parseDisplayDiff: (value) => { return String(value / 2).replace('.5', '+'); },
  parseIntFromDiff: (value) => { return parseFloat(value.replace('+', '.5')) * 2; },
  parsePack: (value) => {
    switch (value) {
    default: return undefined;
    // Base game
    case 'single': return 'Memory Archive';
    case 'base': return 'Arcaea';
    case 'extend': return 'World Extend';
    // Main story
    case 'vs': return 'Black Fate';
    case 'prelude': return 'Adverse Prelude';
    case 'rei': return 'Luminous Sky';
    case 'yugamu': return 'Vicious Labyrinth';
    case 'core': return 'Eternal Core';
    // Side story
    case 'observer': return 'Esoteric Order';
    case 'observer_append_1': return 'Esoteric Order: Pale Tapestry';
    case 'alice': return 'Ephemeral Page';
    case 'alice_append_1': return 'Ephemeral Page: The Journey Onwards';
    case 'omatsuri': return 'Sunset Radiance';
    case 'zettai': return 'Absolute Reason';
    case 'nijuusei': return 'Binary Enfold';
    case 'mirai': return 'Ambivalent Vision';
    case 'shiawase': return 'Crimson Solace';
    // Collab
    case 'maimai': return 'maimai';
    case 'ongeki': return 'O.N.G.E.K.I.';
    case 'chunithm': return 'CHUNITHM';
    case 'chunithm_append_1': return 'CHUNITHM: Collaboration Chapter 2';
    case 'groovecoaster': return 'Groove Coaster';
    case 'tonesphere': return 'Tone Sphere';
    case 'lanota': return 'Lanota';
    case 'dynamix': return 'Dynamix';
    }
  },
};
