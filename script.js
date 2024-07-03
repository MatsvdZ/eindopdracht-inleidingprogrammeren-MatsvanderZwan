// Variabelen 
let pogingen = 0;
let randomGetal = Math.floor(Math.random() * 100 + 1);

const raad = document.getElementById("raad");
const invoeren = document.getElementById("invoeren");
const hint = document.getElementById("hint");
const pogingenTekst = document.getElementById("pogingen");
const audio = new Audio("click.mp3");

// Event listener, zorgt dat de knop reageert op de gebruiker zijn input en function uitvoert
invoeren.addEventListener("click", controleerAntwoord)

// controleert het getal in de input box
function controleerAntwoord() {
    const userValue = Number(raad.value);
    pogingen = pogingen + 1; 

    audio.play();

    // Conditionals, hiermee wordt aangegeven wanneer je het juiste getal hebt, of wanneer je te hoog of te laag zit
    
    if(userValue === randomGetal) {
        hint.textContent = "Gefeliciteerd, hebt het juiste getal geraden!";
    } else if (userValue < randomGetal) {
        hint.textContent = "Je getal is te laag";
    } else {
        hint.textContent = "je getal is te hoog";
    }
    // door dit stukje code wordt het aantal pogingen onderaan het scherm steeds aangepast naar de juiste cijfers
    pogingenTekst.textContent = "Pogingen: " + pogingen;
}

