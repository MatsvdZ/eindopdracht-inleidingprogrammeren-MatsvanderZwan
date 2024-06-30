// Variabelen 
let pogingen = 0;
let randomGetal = Math.floor(Math.random() * 100 + 1);

const raad = document.getElementById("raad");
const invoeren = document.getElementById("invoeren");
const hint = document.getElementById("hint");
const pogingenTekst = document.getElementById("pogingen");

// Event listeners
invoeren.addEventListener("click", controleerAntwoord);

// controleert het getal in de input box
function controleerAntwoord() {
    const userValue = Number(raad.value);
    pogingen = pogingen + 1; 

    // Conditionals
    if(userValue === randomGetal) {
        hint.textContent = "Gefeliciteerd, hebt het juiste getal geraden!";
    } else if (userValue < randomGetal) {
        hint.textContent = "Je getal is te laag";
    } else {
        hint.textContent = "je getal is te hoog";
    }

    pogingenTekst.textContent = "Pogingen: " + pogingen;
}

