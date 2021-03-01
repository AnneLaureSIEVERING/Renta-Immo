'use strict';

let amountLoan = document.querySelector('#amountImmo');
let duration = document.querySelector('#duration');

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
    // console.log(durationValue);

    switch(true) {
        case (durationValue == 10):
            return intRate = 0.0075;

        case (durationValue == 15):
            return intRate = 0.0095;

        case (durationValue == 20):
            return intRate = 0.0110;
        
        case(durationValue == 25):
            return intRate = 0.0135;

        default:
            console.log('erreur dans le switch');
    }
}

// fonction pour calculer le montant de la mensualité du prêt
function amountMonthlyPaiement(rate, estAmount, durate) {
    // m = [(M*t)/12] / [1-(1+(t/12))^-n].
    let durateEstate = -12 * Number(durate.value);
    let tauxByMonth = rate / 12;
    monthlyPayment = (estAmount*tauxByMonth) / (1-(1+tauxByMonth) ** durateEstate);
    let resultAmountMonthly = monthlyPayment.toFixed(2);
    return resultAmountMonthly;
}

// fonction pour calculer le montant total des intérêts
function totalOfInterest(durate, estAmount, rate) {
    let interestAmount = estAmount * rate * Number(durate.value)
    let totalInterest = interestAmount.toFixed(2);
    return totalInterest;
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

function displayAmountInterest(durate, estAmount, rate) {
    let valueInterest = totalOfInterest(durate, estAmount, rate);
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
    estateAmount = Number(amountLoan.value);
    interestRate(duration);
    validateForm(amountLoan, duration);
});


// Gestion des erreurs 
function validateForm(amtLoan, durate) {

    let errorList = [];

    if( amtLoan.value === '' ) {
        amtLoan.style.border = '2px solid #D30A64';
        amtLoan.style.borderRadius = '32px';
        errorList.push(errorList.length + 1);
    } else {
        amtLoan.style.border = 'none';
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
        displayAmountInterest(duration, estateAmount, intRate);
        if (!state.isResultOpen) displayTransition();
    } else {
        console.log("Certains champs du formulaire sont manquants");
    }
}
