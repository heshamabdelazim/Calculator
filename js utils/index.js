import {
  calculatorBottons,
  dark_lightInput,
  darkAndLight,
  outputEquation,
  calculatorLabel,
  dot_is_clicked,
  special_is_clicked,
  resetting,
  calc_output,
  clickAnimation,
  digit_is_clicked,
  equal_is_clicked,
} from "./functions.js";
const isFirstNumber = outputEquation.innerHTML.toLowerCase() == "welcome";
// let calculatorHead = document.querySelector(".calculator-parent .head");

const calculatorParentBottom = document.querySelector(
  ".calculator-parent .parent-bottom"
);
const specialPattern = /[\*\-\/\+]/; // / [*/-+] /g
const digitPattern = /\d+/; //5465897896413521
// console.log(calculatorParentBottom);

let result = 0; //it's equal arrayResult[0] and shown to the user

let interactions = 0;

// some validations

dark_lightInput.addEventListener("change", (event) => {
  // dark and light mode
  if (event.target.checked) {
    console.log("checked");
    darkAndLight(
      "#eaeaea",
      "white",
      "switch to dark mood",
      "black",
      "white",
      "#f0ab59"
    );
  } else {
    console.log("Not checked");
    darkAndLight(
      "gray",
      "black",
      "switch to light mood",
      "white",
      "black",
      "#f0ab59"
    );
  }
});

calculatorBottons.forEach((btn) => {
  // every btn will ..
  // addClassNumber(btn); //all numbers will have class number

  btn.addEventListener("click", (event) => {
    clickAnimation(btn); // UI animation after press btns
    /*
  # SOME RULES of calculators
  - you can enter only one dot not many dots in the num. That will be after pressing signs
  - if nothing but you pressed (.) it will be (0.)
  - if nothing but you pressed (+) ,No change
  */

    const btnIsDot = btn.innerHTML == "."; //true : false //at the beginning it will be (0.)
    const btnIsSpecial = specialPattern.test(btn.innerHTML); //to prevent the user to make (3+5+++)
    const btnIsDigit = digitPattern.test(btn.innerHTML);
    const btnIsAC = btn.innerHTML.toLowerCase() == "ac";
    const btnIsEqual = btn.innerHTML == "=";

    if (btnIsDot) {
      dot_is_clicked(btn); //dot can't be many times like (4.4.5...)
    } else if (btnIsDigit) {
      digit_is_clicked(btn);
    } else if (btnIsSpecial) {
      special_is_clicked(btn); //special character can't be many times like (4+++5-/)
    } else if (btnIsAC) {
      resetting();
    } else if (btnIsEqual) {
      equal_is_clicked();
    }
  });
});

// joining(); //when the user press + the numsArray will join and sending the data to another empty array to addition

// ========== all functions used
// this function will work when the user press the for dark and light mode

function addClassNumber(btn) {
  //just adding class to any numbers btns
  const isNumber = !isNaN(parseInt(btn.innerHTML)) || btn.innerHTML == ".";
  if (isNumber) {
    btn.classList.add("number");
  }
}

function btn_Does_Calc(btn) {
  const outputEquArray = outputEquation.innerHTML.split("");
  const isFinalSpcial = /[\+\-\*\/]/g.test(
    outputEquArray[outputEquArray.length - 1]
  );
  // ================
  // console.log("20.5+10.3".match(/\d+\.\d+/g));
  // console.log("20.510.3".match(/[+*/-]?\d+\.\d+/g));
  if (btnIsDot) {
    if (!isDotEntered) {
      outputEquation.innerHTML = isFirstNumber
        ? "0."
        : outputEquation.innerHTML + ".";
      isDotEntered = true;
    }
  } else {
    //here btn will never be (.) so it may be (+-*/123)
    const btnIsSpecial = /\D/g.test(btn.innerHTML);
    isDotEntered = btnIsSpecial ? false : isDotEntered; //when the user pressed (+) the user can use (.) again
    console.log(isDotEntered);
    if (isFirstNumber && btnIsSpecial) {
      //if special character(+) at the beginning, Ok make it {0+}
      outputEquation.innerHTML = `0${btn.innerHTML}`;
    } else if (isFirstNumber && !btnIsSpecial) {
      // if number(2) at the beginning, ok push inside
      // outputEquation.innerHTML = ""; //this will delete welcome
      outputEquation.innerHTML = btn.innerHTML;
    } else {
      //if the the user entered
      outputEquation.innerHTML =
        isFinalSpcial && btnIsSpecial
          ? outputEquation.innerHTML
          : outputEquation.innerHTML + btn.innerHTML;
    }
  }
}

function isLastEle_isDot() {
  //why? if the user make (10.) then pressed (+) so it will be (10)
  const outputIntoArray = Array.from(outputEquation.innerHTML);
  const isLastEle_isDot = outputIntoArray[outputIntoArray.length - 1] == ".";
  isLastEle_isDot && outputIntoArray.pop();
  outputEquation.innerHTML = outputIntoArray.join("");
}

function makingResult(btn) {
  /* 
  (outputResult) is a dom that will hold the output and
  you've got (buildEquationArr array that has all user inputs) 
  */
  // checking if the user entered signs at the beginning
  // of course the answer will not hold any signs
}

// function sum(...el) {
//   let submition = el.reduce((acc, curr) => +acc + +curr);
//   return submition;
// }
// function sub(...el) {
//   let substract = el.reduce((acc, curr) => +acc - +curr);
//   return substract;
// }
// function multi(...el) {
//   let multiply = el.reduce((acc, curr) => +acc * +curr);
//   return multiply;
// }
// function devid(...el) {
//   let deviding = el.reduce((acc, curr) => +acc / +curr);
//   return deviding;
// }

// function operation(operator) {
//   if (operator == "+") {
//     return (arrayResult = [sum(...arrayResult)]);
//   }
//   if (operator == "-") {
//     return (arrayResult = [sub(...arrayResult)]);
//   }
//   if (operator == "*") {
//     return (arrayResult = [multi(...arrayResult)]);
//   }
//   if (operator == "/") {
//     return (arrayResult = [devid(...arrayResult)]);
//   }
// }

// function sendingData() {
//   arrayResult.push(joined);
//   numsArray = [];
// }

const test = "this is a word";
console.log(test.match(/word\b/gi)); //
// console.log("20..5+70".match(/\d+(\d+)?/gi));
console.log("20..5+70".match(/\W/gi).includes("."));

// console.log(test.match(/\D/gi).join(""));

const problem = "Os1 Os10s Os2 Os8 Oss80s";
//I need (any + s + numbers)
// console.log()

// function plusbtn(btn) {
//   // user pressed + so, it will check is it the firstNumber? don't write anything
//   isDotEntered = false; //allow user to use dot again

//   outputEquation.innerHTML = !isFirstNumber
//     ? outputEquation.innerHTML + "+"
//     : outputEquation.innerHTML;
//   const numberInputs = outputEquation.innerHTML.match(patternOfNumbers); //it return array of intputs
//   const specialSign = outputEquation.innerHTML.match(isAnySigns); //return array of signs  //will be one sign
//   console.log(numberInputs); //return array
//   console.log(specialSign); //return array

//   outputEquation.innerHTML =
//     numberInputs.length == 1
//       ? numberInputs[0] + "+"
//       : calcOutput(numberInputs[0], numberInputs[1], specialSign[0]) + "+";
//   console.log();
// }
