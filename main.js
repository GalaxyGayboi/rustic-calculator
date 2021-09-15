// DOM Manipulation
const container = document.querySelector('#container');
const numberContainer = document.querySelector('#numberContainer');
const operatorContainer = document.querySelector('#operatorContainer')
const numberButtons = numberContainer.querySelectorAll("button");
const operatorButtons = operatorContainer.querySelectorAll("button");
const screen = document.querySelector('#screen');
const paper = document.querySelector('#paper');
const currentNumber = document.createElement('p');
const history = document.createElement('p');
const lineBreak = document.createElement('BR');
let historyText = '';
paper.appendChild(history);
screen.appendChild(currentNumber);
history.innerHTML = `${historyText}`;
history.style = "color: black; font-size: 20px;"
currentNumber.style = "color: white; font-size: 40px; text-align: right;"

function add() {
    numList[thisNum] = parseInt(finalNum); // saves current number in a full list of all inputted numbers
    historyText += ` + `;
    history.innerHTML = `${historyText}`;
    numArray = []; // clears numArray for the next number
    finalNum = ""; // clears finalNum for the next number
    currentOperator[thisNum] = "add"; // tells operate() which operator is being used
    console.log(numList)
    justEqualed = false;
    currentlyOperating = true;
    }


function subtract() {
    numList[thisNum] = parseInt(finalNum); // saves current number in a full list of all inputted numbers
    historyText += ` - `;
    history.innerHTML = `${historyText}`;
    numArray = []; // clears numArray for the next number
    finalNum = ""; // clears finalNum for the next number
    currentOperator[thisNum] = "subtract"; // tells operate() which operator is being used
    console.log(numList)
    justEqualed = false;
    currentlyOperating = true;
}

function multiply() {
    numList[thisNum] = parseInt(finalNum); // saves current number in a full list of all inputted numbers
    historyText += ` x ` //ray for the next number
    finalNum = ""; // clears finalNum for the next number
    currentOperator[thisNum] = "multiply"; // tells operate() which operator is being used
    console.log(numList)
    justEqualed = false;
    currentlyOperating = true;
}

function divide() {
    numList[thisNum] = parseInt(finalNum); // saves current number in a full list of all inputted numbers
    historyText += ` / `;
    history.innerHTML = `${historyText}`;
    numArray = []; // clears numArray for the next number
    finalNum = ""; // clears finalNum for the next number
    currentOperator[thisNum] = "divide"; // tells operate() which operator is being used
    console.log(numList)
    justEqualed = false;
    currentlyOperating = true;
}

function operate() {
    for(let i = 0; i <= numList.length; i++) {
        firstNumberIsFound++;
        if (i === numList.length) {         
            currentNumber.textContent = `${numList[i-1]}`;
            historyText += ` = ${numList[i - 1]}`;
            history.innerHTML = `${historyText}`;
            justEqualed = true;
            thisNum = 0;
            console.log(numList)
            finalSolution = numList[numList.length - 1]
            numList = [];
            finalNum = finalSolution;
            firstNumberIsFound++;
            historyTextNum++;
            console.log(numList)
            console.log(finalSolution)
            console.log(finalNum)
            console.log(firstNumberIsFound)
        }
        if(currentOperator[i] === "add") {
            numList[i + 1] = numList[i] + numList[i + 1]
            console.log(numList[i + 1])
        } else if(currentOperator[i] === "subtract") {
            numList[i + 1] = numList[i] - numList[i + 1]
            console.log(numList[i + 1])
        } else if(currentOperator[i] === "multiply") {
            numList[i + 1] = numList[i] * numList[i + 1]
            console.log(numList[i + 1])
        }  else if(currentOperator[i] === "divide") {
            if (numList[i + 1] === 0) {
                console.log('ERROR')
                currentNumber.textContent = 'ERROR';
            } else {
            numList[i + 1] = numList[i] / numList[i + 1]
            console.log(numList[i + 1])
            } 
    }
    }
}
function clear() {
    numArray = []; // clears numArray for the next number
    finalNum = ""; // clears finalNum for the next number
    numList = []; // clears numList for a new set
    currentOperator = []; // clears currentOperator
    finalNum = ""; // clears finalNum
    historyText += "<br><br>";
    ;
}
// Storing and Operating on Variables
let numList = [];
let thisNum = 0;
let numArray = [];
let currentOperator = [];
let finalNum = "";
let runCount = 0;
let justEqualed = false;
let currentlyOperating = false;
let finalSolution = 0;
let firstNumberIsFound = 0;
let historyTextNum = 0;
    numberButtons.forEach((button) => {
        button.classList.add('numberButton');
        button.addEventListener('click', () => {
            if (currentlyOperating === true) {
                thisNum++;
            }
            if (justEqualed === true) {
                clear();
                currentlyOperating = false;
                justEqualed = false;
                numArray.push(button.innerHTML);
                finalNum = parseInt(numArray.join(""));
                currentNumber.textContent = `${finalNum}`
                historyText += `${button.innerHTML}`
                history.innerHTML = `${historyText}`
                console.log(finalNum);
                console.log(justEqualed)
                console.log(`numList: ${numList}`)
                console.log(`thisNum: ${thisNum}`)
            } else {
            currentlyOperating = false;
            numArray.push(button.innerHTML);
            finalNum = parseInt(numArray.join(""));
            currentNumber.textContent = `${finalNum}`
            historyText += `${button.innerHTML}`
            history.innerHTML = `${historyText}`
            // currentNumber.textContent = `${finalNum}`;
           console.log(finalNum);
           console.log(justEqualed)
           console.log(`numList: ${numList}`)
           console.log(`thisNum: ${thisNum}`)
            }
        })
    })




operatorButtons.forEach((button) => {
    button.classList.add('operatorButton');
    button.addEventListener('click', () => {
        console.log(button)
        if(button.innerHTML === "+") {
            add();
        }else if(button.innerHTML === "-") {
            subtract();
        }else if(button.innerHTML === "x") {
            multiply();
        }else if(button.innerHTML === "/") {
            divide();
        }else if(button.innerHTML === "=") {
            numList.push(finalNum);
            operate();
        } else if(button.innerHTML === "C") {
            clear();
        }
        
    })
})
