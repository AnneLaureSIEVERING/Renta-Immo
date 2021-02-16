let price = document.querySelector('#price');
let notary = document.querySelector('#notary');
let agency = document.querySelector('#agency');
let roadworks = document.querySelector('#roadworks');
let rent = document.querySelector('#rent');
let button = document.querySelector('#button');

let classRent = document.querySelector('.classRent');
let classResults = document.querySelector('.classResults');

let nRent;
let priceTotal;



// Event sur la sortie de l'input concernant le loyer pour un affichage dynamique de la somme sur 1 an
rent.addEventListener('blur', (e) => {
    e.preventDefault;
    nRent = rentByYear(rent);
    displayRentByYear(nRent);
});


// Event au clic sur le boutton "calculer"
button.addEventListener('click', (e)=> {
    e.preventDefault;
    priceTotal = totaPriceImmo(price, notary, agency, roadworks);
    
    displayProfitability(priceTotal, nRent);
    displayAmountProfitability(priceTotal, nRent, 10)
});

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
    return Math.round(rt / pxTotal * 100);
}

// Fonction qui permet de calculer le montant de la rentabilité d'un investissement avec interet compose
function interestCompose(priceTotal, rt, nYear) {
    return priceTotal * Math.pow((1 + rt / priceTotal), nYear) - priceTotal;
}


// Liste des fonctions pour l'intégration dans le DOM des résultats
function displayProfitability(pxTotal, nRtx) {
    let profiTx = profitability(pxTotal, nRtx);
    let displayValueResult = document.createElement('p');
    displayValueResult.textContent = 'Rentabilité brute : ' + profiTx + ' %';
    classResults.appendChild(displayValueResult);
}

function displayAmountProfitability(pxTotal, nRent, nYear) {
    let valueAmount = interestCompose(pxTotal, nRent, nYear);
    let displayValueAmount = document.createElement('p');
    displayValueAmount.textContent = 'Rentabilité sur 10 ans : ' + Math.round(valueAmount) + ' €';
    classResults.appendChild(displayValueAmount);
}

function displayRentByYear(valueRentByYear) {
    let valueRent = document.createElement('p');
    valueRent.textContent = '(équivaut à ' + valueRentByYear + ' € par an)';
    classRent.appendChild(valueRent);
}

// TODO : Fonction pour calculer les frais de notaire automatiquement


