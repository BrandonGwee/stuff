import { prefixes } from "./gibberish.js";
import { suffixes } from "./gibberish.js";
import { weighted_vowels as vowels} from "./gibberish.js";
import { weighted_consonants as consonants } from "./gibberish.js";

document.addEventListener("DOMContentLoaded", (event) => {
    updateTitle(gibberish());
})

function randomNum (range_min, range_max) {
    return (Math.floor( Math.random() * (range_max - range_min) ) + range_min);
}

function gibberish() {
    let output = '';

    output = concat(prefixes[randomNum(0, prefixes.length)], 
    consonants[randomNum(0, consonants.length)],
    vowels[randomNum(0, vowels.length)]);

    for (let i = 0; i < randomNum(0, 6); i++) {
        if (randomNum(0,6) < 3) {
            output = concat(output, vowels[randomNum(0, vowels.length)]);
        } 
        else {
            output = concat(output, consonants[randomNum(0, consonants.length)]);
        }
    }

    concat(output, consonants[randomNum(0, consonants.length)], 
    (suffixes[randomNum(0, suffixes.length)]));

    return output;
}

function updateTitle (text) {
    let title = ``;

    let capitalised_text = (text[0].toUpperCase()).concat(text.slice(1, -1));

    title = `${capitalised_text} Pictionary`

    document.getElementById('pict_title').innerHTML = title;
}