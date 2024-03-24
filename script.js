const linksBoven = document.querySelector('.paneel-linksboven')
const rechtsBoven = document.querySelector('.paneel-rechtsboven')
const linksOnder = document.querySelector('.paneel-linksonder')
const rechtsOnder = document.querySelector('.paneel-rechtsonder')

const clickAudio = new Audio("click1.mp3")
const verlorenAudio = new Audio("verloren.mp3")

linksBoven.addEventListener('click', geluid)    // hier heb ik ervoor gezord dat als je een paneel aanklikt, er geluid komt
rechtsBoven.addEventListener('click', geluid)
linksOnder.addEventListener('click', geluid)
rechtsOnder.addEventListener('click', geluid)

function geluid() {
    clickAudio.play()
}

const pakRandomPaneel = () => {  //pakRandomPaneel wordt gebruikt om een willekeurig paneel te selecteren uit de lijst met panelen.
    const panelen = [
        linksBoven,
        rechtsBoven,
        linksOnder,
        rechtsOnder
    ]
   return panelen[parseInt(Math.random() * panelen.length)]
}

reeks = [pakRandomPaneel()]
let reeksToGuess = [...reeks]

//knipperen wordt gebruikt om een paneel te laten knipperen. Dit wordt gedaan door de klasse 'active' toe te voegen aan het paneel, en vervolgens na een korte delay de klasse 'active' te verwijderen
const knipperen = (paneel) => {                         
    return new Promise((resolve, reject) => {
        paneel.className += ' active'
        setTimeout(() => {
            paneel.className = paneel.className.replace(
                ' active', '') 
            setTimeout(() => {
                resolve()
            }, 400)
        }, 1000)
    })
}

//dit maakt dat je niet kan klikken op het moment dat de volgorde van de panelen afspeelt.
let canClick = false

/* panelClicked wordt aangeroepen wanneer een paneel wordt aangeklikt. 
controleert of de gebruiker het juiste paneel heeft aangeklikt, en of er nog meer panelen 
zijn in de reeks die moet worden herinnerd. Als de speler het juiste paneel heeft aangeklikt, wordt de 
volgende ronde van het spel gestart door een nieuw paneel toe te voegen aan de reeks en de reeks moet 
worden herinnerd te vernieuwen. Als de gebruiker het verkeerde paneel heeft aangeklikt, wordt het spel 
gestopt en wordt het verliesgeluid afgespeeld.*/
const panelClicked = panelClicked => {
    if (!canClick) return
    const verwachtPaneel = reeksToGuess.shift()
    if (verwachtPaneel === panelClicked) {
        if (reeksToGuess.length === 0) {
            // start volgende ronde
            reeks.push(pakRandomPaneel())
            reeksToGuess = [...reeks]
            startKnipperen()
        }
    } else {
        // stop spel
        document.getElementById('verloren').style.display = 'block';
        document.getElementById('opnieuw').style.display = 'block';
        verlorenAudio.play()
    }
}

/* startKnipperen wordt gebruikt om de knipperende effecten van de panelen in de reeks te starten. 
Dit wordt gedaan door de functie knipperen asynchroon te roepen voor elk paneel in de reeks. 
Dit zorgt ervoor dat de paneel knipperen in de juiste volgorde.*/
const startKnipperen = async () => {
    canClick = false
    for (const paneel of reeks) {
        await knipperen(paneel)
    }
    canClick = true // nu kan je weer klikken
}

startKnipperen() //begint het spel
