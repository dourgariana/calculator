// Note: A great option for improvement is using a rerender() function for updating outputField

import { easing, tween, styler } from "popmotion";

const buttons = document.querySelector(".button-container"); // event delegation for buttons
const outputField = document.querySelector(".output-field"); // display
let total = 0; // keeps track of math, even if not displayed
let newNumber = true; // determines if a new number is starting
let prevOperator = null; // tracks the previous operator

// This could be cleaner. Better to match on innerText??
buttons.addEventListener("click", function (event, index) {
  const buttonClass = event.target.className;
  if (buttonClass.match("clear")) {
    console.log("Clear clicked");
    clear();
  } else if (buttonClass.match("backspace")) {
    console.log("Backspace clicked");
    backspace();
  } else if (buttonClass.match("key-operator")) {
    console.log("Operator clicked");
    operator(event.target.innerText);
  } else if (event.target.tagName === "BUTTON") {
    // all numbers
    console.log("Number clicked");
    number(event.target.innerText);
  }
});

// Clears everything
function clear() {
  outputField.innerText = 0;
  total = 0;
  newNumber = true;
  prevOperator = false;
}

// Removes right-most number
function backspace() {
  const str = outputField.innerText;
  outputField.innerText = str.substring(0, str.length - 1);
}

// Updates total basaed on most recent operator, preps for new number
function operator(op) {
  if (prevOperator === null) {
    total = parseInt(outputField.innerText);
  } else if (prevOperator === "\xF7" && total !== 0) {
    total = total / parseInt(outputField.innerText);
  } else if (prevOperator === "x") {
    total = total * parseInt(outputField.innerText);
  } else if (prevOperator === "+") {
    total = total + parseInt(outputField.innerText);
  } else if (prevOperator === "-") {
    total = total - parseInt(outputField.innerText);
  }
  newNumber = true;
  prevOperator = op;
  if (op === "=") {
    outputField.innerText = total.toString();
    total = 0;
    prevOperator = null;
    newNumber = true;
  }
}

// Determines display of number input, based on whether first number or first digit of number
function number(num) {
  if (outputField.innerText === "0") {
    outputField.innerText = num;
    total = num;
    newNumber = false;
  } else if (newNumber) {
    outputField.innerText = num;
    newNumber = false;
  } else {
    outputField.innerText = outputField.innerText + num;
  }
}

const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const doggos = document.querySelector(".doggos");

function addNewDoggo() {
  const promise = fetch(DOG_URL);
  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    });
}

console.log("this will log first");
document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);

const divStyler = styler(document.querySelector(".box"));

tween({
  from: 0,
  to: { x: 300, rotate: 180 },
  duration: 1000,
  ease: easing.backOut,
  flip: Infinity,
  // elapsed: 500,
  // loop: 5,
  // yoyo: 5,
}).start(divStyler.set);
