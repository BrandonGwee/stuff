export const prefixes = concat(
    [
        "anti", "a", "de", "dis", "im",
        "un", "over", "extra", "mega", "inter", "in", "counter-", "semi", "sub",
        "under", "mis", "post", "pre", "re", "con", "contra", "ante", "co", "an"
    ], 
new Array(20));

export const suffixes = concat(
    [
        "acy", "al", "ance", "dom", "er", "or", "ism", "ist", "ity",
        "ment", "ness", "ion", "able", "ible", "ful", "ess", "ish", "ive", "ious", "ous", "y",
        "ian", "ia", "ium", "nant", "s", "es"
    ],
 new Array(20));

export const weighted_consonants = concat(
    ['j', 'r', 'v', 'x', 'z'],
    Array(2).fill(['b', 'c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'w']).flat(),
    Array(3).fill(['r', 's', 't']).flat()
);

export const weighted_vowels = "aeiouyaei".split("");

