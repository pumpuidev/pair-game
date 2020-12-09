const cardArray = ["ace", "joker", "queen", "king", "ten"];
let gameCardArray = cardArray.concat(cardArray);
let visibleCards = []; //Összehasonlítandó kártyák
let hits = [];
//let visibleCardsCounter = 0;

// Összekeverés
gameCardArray.sort(() => Math.random() - 0.5);

// Megjelenítés
renderCards();

// Stopper
const start = new Date().getTime();
let stopper = setInterval(function() { 
    const currentTime = new Date().getTime();
    const distance = currentTime - start;
    const min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const sec = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    document.getElementById("stopper").innerHTML = min +":"+ sec;
}, 1000)

function renderCards() {
    let helperContent = "";
    gameCardArray.forEach(element => {
        helperContent += createCard(element, hits.includes(element));
    });
    document.getElementById("stage").innerHTML = helperContent;
}

function createCard(img, visible) {
    return '<a href="javascript:;" onclick="showCard(this)" cardName="' + img + '"><div class="playing-card">' +
        '<div class="flip-card">' +
            '<div class="card-back">' +
                '<img src="./pic/' + img + '.png" alt="">' +
            '</div>' +
        '<div class="card-front ' + (visible ? "visible" : "") + '">' +           
        '</div>' +
        '</div>' +
    '</div></a>';
}

function showCard(event) {
    if (!event.classList.contains("visibleCard")) {
        if (visibleCards.length < 2) {
            event.classList.add("visibleCard");
            visibleCards.push(event.getAttribute("cardName"));
        }
        if (visibleCards.length >= 2) {
            compareCards();
        }
    }
}

function compareCards() {
    if (visibleCards[0] == visibleCards[1]) {
        if (!hits.includes(visibleCards[0])) {
            hits.push(visibleCards[0]);
        }
        visibleCards = [];
        if (hits.length == 5) {
            alert("Kész!!!!")
        }
    } else {
        setTimeout(function(){ 
            visibleCards = [];
            renderCards();
        }, 1000);
    }

}
