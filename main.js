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

function anyOperator(operator, sign) {
    if (currentlyOperating === true) {
        currentOperator[thisNum] = `${operator}`;
        historyText = historyText.slice(0, -3);
        historyText += ` ${sign} `
        history.innerHTML = `${historyText}`;
    } else if(justEqualed === false) {
        numList[thisNum] = parseFloat(finalNum); // saves current number in a full list of all inputted numbers
        historyText += `${finalNum} ${sign} `;
        history.innerHTML = `${historyText}`;
        numArray = []; // clears numArray for the next number
        finalNum = ""; // clears finalNum for the next number
        currentOperator[thisNum] = `${operator}`; // tells operate() which operator is being used
        console.log(numList)
        justEqualed = false;
        currentlyOperating = true;
        negativeStartPoint += historyText.length - 1;
        currentlyNegative = false;
    } else {
        numList[thisNum] = parseFloat(finalNum); // saves current number in a full list of all inputted numbers
        historyText += ` ${sign} `;
        history.innerHTML = `${historyText}`;
        numArray = []; // clears numArray for the next number
        finalNum = ""; // clears finalNum for the next number
        currentOperator[thisNum] = `${operator}`; // tells operate() which operator is being used
        console.log(numList)
        justEqualed = false;
        currentlyOperating = true;
        negativeStartPoint += historyText.length - 1;
        currentlyNegative = false;
    }
    }

function operate() {
    for(let i = 0; i <= numList.length; i++) {
        firstNumberIsFound++;
        if (i === numList.length) {         
            currentNumber.textContent = `${numList[i-1]}`;
            historyText += `${finalNum} = ${numList[i - 1]}`;
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
let negativeStartPoint = 0;
let currentlyNegative = false;
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
                finalNum = parseFloat(numArray.join(""));
                currentNumber.textContent = `${finalNum}`
                console.log(finalNum);
                console.log(justEqualed)
                console.log(`numList: ${numList}`)
                console.log(`thisNum: ${thisNum}`)
            } else if (button.innerHTML === "+/-") {
                if (currentlyNegative === false) {
                    currentlyOperating = false;
                    finalNum = -Math.abs(finalNum);
                    currentNumber.textContent = `${finalNum}`
                    history.innerHTML = `${historyText}`
                    currentlyNegative = true;
                    console.log(finalNum.length)
                } else {
                    currentlyOperating = false;
                    finalNum = Math.abs(finalNum);
                    currentNumber.textContent = `${finalNum}`
                    history.innerHTML = `${historyText}`
                    currentlyNegative = false;
                    console.log(finalNum.length)
                }
            } else if (button.innerHTML === '.') {
                currentlyOperating = false;
                numArray.push(button.innerHTML);
                finalNum = parseFloat(numArray.join(""));
                currentNumber.textContent = `${finalNum}.`
                console.log(finalNum);
                console.log(justEqualed)
                console.log(numArray)
                console.log(`numList: ${numList}`)
                console.log(`thisNum: ${thisNum}`)
            } else {
                currentlyOperating = false;
                numArray.push(button.innerHTML);
                finalNum = parseFloat(numArray.join(""));
                currentNumber.textContent = `${finalNum}`
                console.log(finalNum);
                console.log(justEqualed)
                console.log(numArray)
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
            anyOperator("add", "+");
        }else if(button.innerHTML === "-") {
            anyOperator("subtract", "-");
        }else if(button.innerHTML === "x") {
            anyOperator("multiply", "x");
        }else if(button.innerHTML === "/") {
            anyOperator("divide", "/");
        }else if(button.innerHTML === "=") {
            numList.push(finalNum);
            operate();
        } else if(button.innerHTML === "C") {
            clear();
        }
        
    })
})
