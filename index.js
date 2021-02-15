let price = document.querySelector('#price');
let notary = document.querySelector('#notary');
let agency = document.querySelector('#agency');
let roadworks = document.querySelector('#roadworks');
let rent = document.querySelector('#rent');
let button = document.querySelector('#button');

let classRent = document.querySelector('.classRent');
let classResults = document.querySelector('.classResults');

let rentByYear;
let priceTotal;
let resultProfitability;
let amountInterest;
let amount;

// calcul automatique du montant annuel que vont représenter les loyers
rent.addEventListener('blur', (rentValue) => {
    rentValue = Number(rent.value);
    rentByYear = rentValue * 12;
    console.log(rentByYear);
    let valueRent = document.createElement('p');
    valueRent.textContent = '(équivaut à ' + rentByYear + ' € par an)';
    classRent.appendChild(valueRent);
})

// Fonctions à déclencher au clic sur le boutton "calculer"
button.addEventListener('click', (e)=> {
    e.preventDefault;
    sum();
    profitability();
    interestCompose();
    integrationHtml();
});

// Fonction somme totale des datas du formulaire
function sum() {
    priceTotal = Number(price.value) + Number(notary.value) + Number(agency.value) + Number(roadworks.value) ;
    console.log(priceTotal);
}

// Fonction qui permet de calculer le taux de rentabilité de l'investissement
function profitability() {
    let result = rentByYear / priceTotal;
    resultProfitability = Math.round(result * 100);
    console.log(resultProfitability);
}

// Fonction qui permet de calculer la rentabilité d'un investissement avec interet compose (sur 10 ans)
function interestCompose() {
    amountInterest = Math.round(priceTotal * Math.pow((1.10), 10));
    console.log(amountInterest);
    amount = amountInterest - priceTotal;
}

// Fonction qui va permettre d'intégrer les datas dans le HTML
function integrationHtml() {
    let integrationValueResult = document.createElement('p');
    integrationValueResult.textContent = 'Rentabilité brute : ' + resultProfitability + ' %';
    classResults.appendChild(integrationValueResult);

    let integrationValueAmount = document.createElement('p');
    integrationValueAmount.textContent = 'Rentabilité sur 10 ans : ' + amount + ' €';
    classResults.appendChild(integrationValueAmount);
}

// TODO : Fonction pour calculer les frais de notaire automatiquement


