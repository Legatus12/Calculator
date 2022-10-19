const screen = document.getElementById("screen");
const previous = document.getElementById("previous");

//control de la operación ha realizar
let operation;

//control de la escritura de un nuevo número o la continuación del mismo
let newNumber = true;

//control de reutilización de operación
let repeating = false;

//array para guardar los operandos
let numbers = [];

//variable auxiliar
let result;

//creamos constantes que almacenan todos los botones de la aplicación, clasificándolos en botones de números, operadores y botones especiales
const buttons = document.getElementsByClassName("button");
const operators = document.getElementsByClassName("operator");
const specials = document.getElementsByClassName("specials");

[...buttons].forEach(x => x.addEventListener("click", () => {
    console.log(x.id);
    if(repeating){
        screen.innerHTML = "0";
        previous.innerHTML = "";
        repeating = false;
    }  
    if(newNumber){
        screen.innerHTML = "";
        newNumber = false;
    }
    if(x.id === "zero" && screen.innerHTML === "0")
        screen.innerHTML = "0";
    else
        screen.innerHTML += x.innerHTML;
}));

[...operators].forEach(x => x.addEventListener("click", () => {
    repeating = false;
    if(screen.innerHTML != ""){
        numbers[0] = (Number(screen.innerHTML));
        console.log(numbers);
        newNumber = true;
        console.log(x.id)
        switch(x.id){
            case "plus" :
                previous.innerHTML = screen.innerHTML + " + ";
                break;
            case "minus" :
                previous.innerHTML = screen.innerHTML + " - ";
                break;
            case "multiply" :
                previous.innerHTML = screen.innerHTML + " x ";
                break;
            case "divide" :
                previous.innerHTML = screen.innerHTML + " / ";
                break;
            case "percentage" :
                previous.innerHTML = screen.innerHTML + " % ";
                break;
        }
        operation = x.id;
    }
}));

[...specials].forEach(x => x.addEventListener("click", () => {
    console.log(x.id)
    switch(x.id){
        case "clear" :
            numbers = [];
            screen.innerHTML = "0";
            previous.innerHTML = "";
            operation = "";
            newNumber = true;
            repeating = false;
            break;
        case "backspace" :
            if(repeating){
                screen.innerHTML = "0";
                previous.innerHTML = "";
            }
            if(screen.innerHTML.length === 1){
                screen.innerHTML = "0";
                newNumber = true;
            }
            else
                screen.innerHTML = screen.innerHTML.substr(0, screen.innerHTML.length - 1);
            repeating = false;
            break;
        case "negative" :
            if(screen.innerHTML !== "0")
                screen.innerHTML.substr(0, 1) === "-" ? screen.innerHTML = screen.innerHTML.substr(1) : screen.innerHTML = "-" + screen.innerHTML;
            repeating = false;
            break;
        case "point" :
            screen.innerHTML += ".";
            newNumber = false;
            repeating = false;
            break;
    }
}));

document.getElementById("equal").addEventListener("click", () => {
    if(screen.innerHTML != ""){
        if(!repeating){
            console.log("not repeating");
            numbers[1] = (Number(screen.innerHTML));
        }
        switch(operation){
        case "plus" :
            result = numbers[0] + numbers[1];
            previous.innerHTML = numbers[0] +" + "+ numbers[1] +" = "+ result;
            screen.innerHTML = result;
            break;
        case "minus" :
            result = numbers[0] - numbers[1];
            previous.innerHTML = numbers[0] +" - "+ numbers[1] +" = "+ result;
            screen.innerHTML = result;
            break;
        case "multiply" :
            result = numbers[0] * numbers[1];
            previous.innerHTML = numbers[0] +" x "+ numbers[1] +" = "+ result;
            screen.innerHTML = result;
            break;
        case "divide" :
            result = numbers[0] / numbers[1];
            previous.innerHTML = numbers[0] +" / "+ numbers[1] +" = "+ result;
            screen.innerHTML = result;
            break; 
        case "percentage" :
            result = numbers[0] * numbers[1] / 100;
            previous.innerHTML = numbers[0] +" % "+ numbers[1] +" = "+ result;
            screen.innerHTML = result;
            break; 
        }
        numbers[0] = Number(screen.innerHTML);
        newNumber = true;
        repeating = true;
        console.log(numbers);
}});
//by Pablo, web dev.