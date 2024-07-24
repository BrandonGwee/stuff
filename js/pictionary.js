import { prefixes } from "./gibberish";
import { suffixes } from "./gibberish";
import { weighted_vowels as vowels} from "./gibberish";
import { weighted_consonants as consonants } from "./gibberish";

document.addEventListener("DOMContentLoaded", (event) => {
    updateTitle(gibberish());
})

function randomNum (range_min, range_max) {
    return Math.floor( Math.random() * (range_max - range_min) ) = range_min;
}

function gibberish() {
    let output = '';

    output = prefixes[ randomNum(0, prefixes.length) ] 
    + consonants[ randomNum(0, consonants.length) ]
    + vowels[ randomNum(0, vowels.length) ];

    console.log(output);

    return output;
}

function updateTitle (text) {
    let title = ``;

    capitalised_text = text[0].toUpperCase() + text.slice(1, -1);

    title = `${capitalised_text} Pictionary`

    document.getElementById('pict_title').innerHTML = title;
}