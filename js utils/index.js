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
