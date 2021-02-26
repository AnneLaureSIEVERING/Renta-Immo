'use strict';

let amountLoan = document.querySelector('#amountImmo');
let amountPerso = document.querySelector('#amountperso');
let roadworks = document.querySelector('#roadworksImmo');
let duration = document.querySelector('#duration');

let classRent = document.querySelector('.rent_input');
let classResults = document.querySelector('.classResults');
let displayResults = document.querySelector('.display_results');

let monthlyPayment;
let intRate;
let estateAmount;

// Etat initial de mon application
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

// fonction pour calculer le taux d'intérêt à appliquer
function interestRate(duration) {
    let durationValue = duration.value;
    console.log(durationValue);

    switch(true) {
        case (durationValue == 10):
            return intRate = 0.0065;

        case (durationValue == 15):
            return intRate = 0.0085;

        case (durationValue == 20):
            return intRate = 0.0102;
        
        case(durationValue == 25):
            return intRate = 0.0126;

        default:
            console.log('erreur dans le switch');
    }
}

// fonction pour calculer le capital à emprunter
function estateLoanAmount(px, rdworks, contrib) {
    return Number(px.value + rdworks.value) - Number(contrib.value);
}

// fonction pour calculer le montant de la mensualité du prêt
function amountMonthlyPaiement(rate, estAmount, durate) {
    return monthlyPayment = ((estAmount * rate)/12) / Math.pow(1-(1+(intRate/12)), durate.value);
}

// fonction pour calculer le montant total des intérêts
function totalOfInterest(durate, monthlyP, contrib) {
    return 12 * durate.value * monthlyP - contrib.value;
}

function displayMonthlyPaiement(rate, estAmount, durate) {
    let monthly = amountMonthlyPaiement(rate, estAmount, durate);
    if(state.isResultOpen) {
        let newValue = document.getElementById('prof-1');
        newValue.textContent = `Mensualité évaluée à :  ${monthly} €`;
        return;
    }
    let displayValueResult = document.createElement('p');
    displayValueResult.setAttribute("class", "profitability");
    displayValueResult.id = "prof-1";
    displayValueResult.textContent = `Mensualité évaluée à :  ${monthly} €`;
    classResults.appendChild(displayValueResult);
}

function displayAmountInterest(durate, monthlyP, contrib) {
    let valueInterest = totalOfInterest(durate, monthlyP, contrib);
    if(state.isResultOpen) {
        let newValue = document.getElementById('prof-2');
        newValue.textContent = `Montant total des intérêts : ${valueInterest} €`;
        return;
    }
    let displayValueAmount = document.createElement('p');
    displayValueAmount.setAttribute("class", "profitability");
    displayValueAmount.id = "prof-2";
    displayValueAmount.textContent = `Montant total des intérêts : ${valueInterest} €`;
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

// Event au clic sur le boutton "calculer"
button.addEventListener('click', (e)=> {
    e.preventDefault;
    interestRate(duration);
    estateAmount = estateLoanAmount(amountLoan, roadworks, amountPerso);
    console.log(estateAmount);
    validateForm(amountLoan, amountPerso, roadworks, duration);
});


// Gestion des erreurs 
function validateForm(amLoan, amContrib, roadworks, durate) {

    let errorList = [];

    if( amLoan.value === '' ) {
        amLoan.style.border = '2px solid #D30A64';
        amLoan.style.borderRadius = '32px';
        errorList.push(errorList.length + 1);
    } else {
        amLoan.style.border = 'none';
    }

    if ( amContrib.value === '') {
        amContrib.style.border = '2px solid #D30A64';
        amContrib.style.borderRadius = '32px';
        errorList.push(errorList.length + 1);
    } else {
        amContrib.style.border = 'none';
    }

    if ( roadworks.value === '') {
        roadworks.value = 0;
    }

    if ( durate.value === '') {
        durate.style.border = '2px solid #D30A64';
        durate.style.borderRadius = '32px';
        errorList.push(errorList.length + 1);
    } else {
        durate.style.border = 'none';
    }

    if(errorList.length === 0) {
        displayMonthlyPaiement(intRate, estateAmount, duration);
        displayAmountInterest(duration, monthlyPayment, amountPerso);
        if (!state.isResultOpen) displayTransition();
    } else {
        console.log("Certains champs du formulaire sont manquants");
    }
}
