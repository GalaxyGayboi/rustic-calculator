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
        currentOperator[thisNum] = `${operator}`; // saves the new sign over the old sign
        historyText = historyText.slice(0, -3); // removes the last inputted sign from historyText
        historyText += ` ${sign} ` // replaces the empty sign spot with the new sign
        history.innerHTML = `${historyText}`;
    } else if(justEqualed === false) { // ensures that there will be no repeats of finalNum in historyText
        numList[thisNum] = parseFloat(finalNum); // saves current number in a full list of all inputted numbers
        historyText += `${finalNum} ${sign} `; // adds both finalNum and the specified sum
        history.innerHTML = `${historyText}`;
        numArray = []; // clears numArray for the next number
        finalNum = ""; // clears finalNum for the next number
        currentOperator[thisNum] = `${operator}`; // tells operate() which operator is being used
        console.log(numList)
        justEqualed = false;
        currentlyOperating = true;
        currentlyNegative = false;
    } else { // where the function will go if operate() has just been performed
        numList[thisNum] = parseFloat(finalNum); // saves current number in a full list of all inputted numbers
        historyText += ` ${sign} `; // adds ONLY the specified sign to historyText
        history.innerHTML = `${historyText}`;
        numArray = []; // clears numArray for the next number
        finalNum = ""; // clears finalNum for the next number
        currentOperator[thisNum] = `${operator}`; // tells operate() which operator is being used
        console.log(numList)
        justEqualed = false;
        currentlyOperating = true;
        currentlyNegative = false;
    }
    }

function operate() {
    for(let i = 0; i <= numList.length; i++) {
        firstNumberIsFound++;
        if (i === numList.length) {
            roundedSolution = Math.round(numList[numList.length - 1] * 100000)/100000;
            stringSolution = roundedSolution.toString();
            if(stringSolution.length >= 10) {
                currentNumber.textContent = `${stringSolution.slice(0,10)}e+${stringSolution.length - 10}`;
            historyText += `${finalNum} = ${stringSolution.slice(0,10)}e+${stringSolution.length - 10}`;
            history.innerHTML = `${historyText}`;
            justEqualed = true;
            thisNum = 0;
            console.log(numList)
            solution = numList[numList.length - 1]
            numList = [];
            finalNum = roundedSolution;
            firstNumberIsFound++;
            } else {
            currentNumber.textContent = `${roundedSolution}`;
            historyText += `${finalNum} = ${roundedSolution}`;
            history.innerHTML = `${historyText}`;
            justEqualed = true;
            thisNum = 0;
            console.log(numList)
            solution = numList[numList.length - 1]
            numList = [];
            finalNum = roundedSolution;
            firstNumberIsFound++;
            console.log(`this is ${roundedSolution.toString().length} char long`)
            console.log(numList)
            console.log(solution)
            console.log(finalNum)
            console.log(firstNumberIsFound)
            }
        }
        if(currentOperator[i] === "add") {
            numList[i + 1] = numList[i] + numList[i + 1]
            console.log(numList[i + 1])
        }   else if(currentOperator[i] === "subtract") {
            numList[i + 1] = numList[i] - numList[i + 1]
            console.log(numList[i + 1])
        }   else if(currentOperator[i] === "multiply") {
            numList[i + 1] = numList[i] * numList[i + 1]
            console.log(numList[i + 1])
        }   else if(currentOperator[i] === "divide") {
            if (numList[i + 1] === 0) {
                historyText += `${finalNum} = ERROR`;
                history.innerHTML = `${historyText}`;
                justEqualed = true;
                console.log('ERROR')
                currentNumber.textContent = 'ERROR';
                break;
            } else {
            numList[i + 1] = numList[i] / numList[i + 1]
            console.log(numList[i + 1])
            } 
        }   else if(currentOperator[i] === "exponent") {
            numList[i + 1] = numList[i] ** numList[i + 1];
            console.log(numList[i + 1])
        }    
    }
}
function clear() {
    numArray = []; // clears numArray for the next number
    finalNum = ""; // clears finalNum for the next number
    numList = []; // clears numList for a new set
    currentOperator = []; // clears currentOperator
    finalNum = ""; // clears finalNum
    historyText += "<br><br>"; // skips a line to make historyText more readable
    justEqualed = false; // ensures that only one line will be skipped if the clear button is pressed
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
let solution = 0;
let firstNumberIsFound = 0;
let currentlyNegative = false;
let roundedSolution = 0;
let stringSolution = "";
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
                if (finalNum === "") {
                    currentlyOperating = false;
                    numArray.push(0);
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
                    currentNumber.textContent = `${finalNum}.`
                    console.log(finalNum);
                    console.log(justEqualed)
                    console.log(numArray)
                    console.log(`numList: ${numList}`)
                    console.log(`thisNum: ${thisNum}`)
            }
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
        }else if(button.innerHTML === "^") {
            anyOperator("exponent", "^");
        }
        else if(button.innerHTML === "=") {
            numList.push(finalNum);
            operate();
        }else if(button.innerHTML === "C") {
            clear();
        } else if(button.innerHTML === "Bksp") {
            if (numArray.length === 1) {
                currentlyOperating = false;
                numArray.pop();
                numArray.push(0);
                finalNum = parseFloat(numArray.join(""));
                currentNumber.textContent = `${finalNum}`
                console.log(numArray.length)
            } else {
            currentlyOperating = false;
            numArray.pop();
            finalNum = parseFloat(numArray.join(""));
            currentNumber.textContent = `${finalNum}`
            console.log(numArray.length)
        }
    }
    })
})
