/* définir clic sur bouton */
const chiffres = document.querySelectorAll(".chiffre");
const operateurs = document.querySelectorAll(".operateur");
const egal = document.getElementById("egal");
const buttons = document.querySelectorAll(".button");
const clearAll = document.getElementById("clearAll");
const DOMecran = document.getElementById("textEcran");

let valeurs = [];
let operations = [];

function garderValeurEtOperateur(valeurEcran, operation){
    let i = valeurs.length;
    let j = operations.length;
    valeurs[i] = valeurEcran;
    operations[j] = operation;
}

buttons.forEach(function(button){
    button.addEventListener("click",function(){
        document.getElementById("errorMessage").textContent = "";
    })
})

clearAll.addEventListener("click",function(){
    valeurs =[];
    operations =[];
    DOMecran.textContent = "";
})


chiffres.forEach(function(chiffre){
    chiffre.addEventListener("click",function(){
        let ecran = DOMecran.textContent;
    if(ecran == "+" || ecran == "-" || ecran == "*" || ecran == "/" || ecran == "^"){
        DOMecran.textContent = chiffre.textContent;
    }
    else{
        DOMecran.textContent += chiffre.textContent;
    }
    })
})

operateurs.forEach(function(operateur){
    operateur.addEventListener("click",function(){
        let textEcran = DOMecran.textContent
        let valeurEcran = Number(textEcran);
        let operation = operateur.textContent;
        
        switch (valeurEcran) {
            case 0 : document.getElementById("errorMessage").textContent = "Vous ne pouvez pas effectuer d'opération avant d'avoir renseigné un nombre";
            break;
            default : garderValeurEtOperateur(valeurEcran, operation);
        }

        DOMecran.textContent = operateur.textContent;
    })
})

egal.addEventListener("click",function(){

    if(DOMecran.textContent == "+" || DOMecran.textContent == "-" || DOMecran.textContent == "*" || DOMecran.textContent == "/" || DOMecran.textContent == "^"){
        document.getElementById("errorMessage").textContent = "Impossible de réaliser le calcul";
    }
    else if (DOMecran.textContent !== ""){
        valeurs.push(DOMecran.textContent);
    }

    if(valeurs.length === 0 || operations.length === 0){
        document.getElementById("errorMessage").textContent = "Impossible de réaliser le calcul";   
    }
    else{
        let total = Number(valeurs[0]);
        for(let i=0; i<valeurs.length; i++){
            switch (operations[i]){
                case "+" : total += Number(valeurs[i+1]);
                break;
                case "-" : total -= Number(valeurs[i+1]);
                break;
                case "*" : total *= Number(valeurs[i+1]);
                break;
                case "/" :
                    if (Number(valeurs[i+1])==0){
                        document.getElementById("errorMessage").textContent = "Impossible de diviser par 0";
                    }
                    else{
                        total /= Number(valeurs[i+1]);
                    }    
                break;
                case "^" : total = total ** Number(valeurs[i+1]);
                break;
            }
        }
        DOMecran.textContent = total;
    }  
})
