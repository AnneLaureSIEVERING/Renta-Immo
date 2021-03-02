'use strict';

let price = document.querySelector('#price');
let notary = document.querySelector('#notary');
let agency = document.querySelector('#agency');
let roadworks = document.querySelector('#roadworks');
let rent = document.querySelector('#rent');
let button = document.querySelector('#button');

let classRent = document.querySelector('.rent_input');
let classResults = document.querySelector('.classResults');
let displayResults = document.querySelector('.display_results');

let nRent;
let priceTotal;
let pxFees;

let state = {
    isFormComputed: false,
    isResultOpen: false
};

function setIsFormComputed(value) {
    state.isFormComputed = value;
}

function setIsResultOpen(value) {
    state.isResultOpen = value;
}

// calcul automatique du montant annuel que vont représenter les loyers
function rentByYear(rt) {
    return Number(rt.value) * 12;
}

// Fonction somme totale des datas du formulaire (hors loyer estimé)
function totaPriceImmo(px, ntx, agx, rdwk) {
    return Number(px.value) + Number(ntx.value) + Number(agx.value) + Number(rdwk.value);
}

// Fonction qui permet de calculer le taux de rentabilité de l'investissement (en pourcentage)
function profitability(pxTotal, rt) {
    let profi = (rt / pxTotal * 100);
    let result = profi.toFixed(2);
    return result;
}

// Fonction qui permet de calculer le montant de la rentabilité d'un investissement avec interet compose
function interestCompose(priceTotal, rt, nYear) {
    return priceTotal * Math.pow((1 + rt / priceTotal), nYear) - priceTotal;
}

// Fonction pour calculer les frais de notaire automatiquement
function notaryFees(pxImmo) {
    let priceImmo = pxImmo.value;

    switch(true) {
        case (priceImmo <= 6500):
            return (priceImmo * (3.870/100)) * 1.20 + 800 + 400 + (priceImmo * 0.058) + (priceImmo * 0.0010);

        case (priceImmo >= 6501 && priceImmo <= 17000):
            return (priceImmo * (1.596/100) + 147.81) * 1.20 + 800 + 400 + (priceImmo * 0.058) + (priceImmo * 0.0010);

        case (priceImmo >= 17001 && priceImmo <= 60000):
            return (priceImmo * (1.064/100) + 238.25) * 1.20 + 800 + 400 + (priceImmo * 0.058) + (priceImmo * 0.0010);
        
        case(priceImmo > 60000):
            return (priceImmo * (0.799/100) + 397.25) * 1.20 + 800 + 400 + (priceImmo * 0.058) + (priceImmo * 0.0010);

        default:
            console.log('erreur dans le switch');
    }
}


// Liste des fonctions pour l'intégration dans le DOM des résultats

function displayNotaryFees(valueFees) {
    notary.setAttribute("value", Math.round(valueFees));
}

function displayRentByYear(valueRentByYear) {
    let valueRent = valueRentByYear;
    if(state.isFormComputed) {
        let newValue = document.getElementById('rent-1');
        newValue.textContent = `(équivaut à ${valueRent} € par an)`;
        return;
    }
    let displayValueRent = document.createElement('p');
    displayValueRent.setAttribute("class", "rent_year");
    displayValueRent.id = "rent-1";
    displayValueRent.textContent = `(équivaut à ${valueRent} € par an)`;
    classRent.appendChild(displayValueRent);
}

function displayProfitability(pxTotal, nRtx) {
    let profiTx = profitability(pxTotal, nRtx);
    if(state.isResultOpen) {
        let newValue = document.getElementById('prof-1');
        newValue.textContent = `Rentabilité brute :  ${profiTx} %`;
        return;
    }
    let displayValueResult = document.createElement('p');
    displayValueResult.setAttribute("class", "profitability");
    displayValueResult.id = "prof-1";
    displayValueResult.textContent = `Rentabilité brute :  ${profiTx} %`;
    classResults.appendChild(displayValueResult);
}

function displayAmountProfitability(pxTotal, nRent, nYear) {
    let valueAmount = interestCompose(pxTotal, nRent, nYear);
    let valueRound = Math.round(valueAmount);
    if(state.isResultOpen) {
        let newValue = document.getElementById('prof-2');
        newValue.textContent = `Rentabilité sur 10 ans : ${valueRound } €`;
        return;
    }
    let displayValueAmount = document.createElement('p');
    displayValueAmount.setAttribute("class", "profitability");
    displayValueAmount.id = "prof-2";
    displayValueAmount.textContent = `Rentabilité sur 10 ans : ${valueRound } €`;
    classResults.appendChild(displayValueAmount);
}

function displayTransition() {
    const getDisplayResultsValue = window.getComputedStyle(displayResults, null);

    if (getDisplayResultsValue.top === "100%") {
        displayResults.classList.add('transition-on');
        displayResults.style.display = "block";
        displayResults.classList.remove('transition-off');
        setIsResultOpen(true);
    } else {
        displayResults.classList.add('transition-off');
        displayResults.classList.remove('transition-on');
        setIsResultOpen(false);
    }
}

// Event sur la sortie de l'input concernant le loyer pour un affichage dynamique de la somme sur 1 an
rent.addEventListener('blur', (e) => {
    e.preventDefault;
    nRent = rentByYear(rent);
    displayRentByYear(nRent);
    setIsFormComputed(true);
});

// Event qui va calculer automatiquement les frais de notaire selon le prix d'achat du bien
price.addEventListener('blur', (e) => {
    e.preventDefault;
    pxFees = notaryFees(price)
    displayNotaryFees(pxFees);
});


// Event au clic sur le boutton "calculer"
button.addEventListener('click', (e)=> {
    e.preventDefault;
    priceTotal = totaPriceImmo(price, notary, agency, roadworks);
    validateForm(price, agency, roadworks, rent);
});


// Gestion des erreurs 
function validateForm(price, agency, roadworks, rent) {

    let errorList = [];

    if( price.value === '' ) {
        price.style.border = '2px solid #D30A64';
        price.style.borderRadius = '32px';
        errorList.push(errorList.length + 1);
    } else {
        price.style.border = 'none';
    }

    if ( agency.value === '') {
        agency.style.border = '2px solid #D30A64';
        agency.style.borderRadius = '32px';
        errorList.push(errorList.length + 1);
    } else {
        agency.style.border = 'none';
    }

    if ( roadworks.value === '') {
        roadworks.value = 0;
    }

    if ( rent.value === '') {
        rent.style.border = '2px solid #D30A64';
        rent.style.borderRadius = '32px';
        errorList.push(errorList.length + 1);
    } else {
        rent.style.border = 'none';
    }

    if(errorList.length === 0) {
        displayProfitability(priceTotal, nRent);
        displayAmountProfitability(priceTotal, nRent, 10);
        if (!state.isResultOpen) displayTransition();
    } else {
        console.log("Certains champs du formulaire sont manquants");
    }
}



