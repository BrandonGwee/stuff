export const prefixes = 
    [
        "anti", "a", "de", "dis", "im",
        "un", "over", "extra", "mega", "inter", "in",  "semi", "sub",
        "under", "mis", "post", "pre", "re", "con", "contra", "ante", "co", "an"
    ].concat(new Array(20).fill('').flat());

export const suffixes = 
    [
        "acy", "al", "ance", "dom", "er", "or", "ism", "ist", "ity",
        "ment", "ness", "ion", "able", "ible", "ful", "ess", "ish", "ive", "ious", "ous", "y",
        "ian", "ia", "ium", "nant", "s", "es"
    ].concat(new Array(20).fill('').flat());

export const weighted_consonants =
    ['j', 'r', 'v', 'x', 'z']
    .concat(Array(3).fill(['b', 'c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'w']).flat())
    .concat(Array(3).fill(['r', 's', 't']).flat());

export const weighted_vowels = "aeiouyaei".split("");

