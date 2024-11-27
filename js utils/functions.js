export const calculatorBottons = document.querySelectorAll(
    ".calculator-parent .buttons div"
  ),
  calculatorParentBottom = document.querySelector(
    ".calculator-parent .parent-bottom"
  ),
  calculatorLabel = document.querySelector(".calculator-parent .head")
    .children[2],
  dark_lightInput = document.querySelector(".calculator-parent .head input"),
  calculatorTools = document.querySelectorAll(
    ".calculator-parent .tools div i"
  ),
  outputEquation = document.querySelector(".calculator-parent .output-parent")
    .children[0],
  outputResult = document.querySelector(".calculator-parent .output-parent")
    .children[1];
console.log(outputResult);
// =======
outputEquation.innerHTML = "Welcome";
// =======
//booleans
let isDotEntered = false,
  beginDot = true;

// ==================
export function darkAndLight(
  parentBackground,
  btnColor,
  label,
  mouseOver,
  mouseOut,
  mouseOut2
) {
  calculatorParentBottom.style.cssText = `transition: 0.6s; background-color: ${parentBackground};`;
  calculatorBottons.forEach((btn) => {
    btn.style.cssText = `color:${btnColor};`;
    calculatorLabel.innerHTML = `${label}`;
    btn.addEventListener(
      "mouseover",
      () => (btn.style.cssText = `transition: 0.6s; color:${mouseOver};`)
    );
    btn.addEventListener(
      "mouseout",
      () => (btn.style.cssText = `transition: 0.6s; color:${mouseOut};`)
    );
  });
  calculatorTools.forEach((tool) => {
    tool.addEventListener(
      "mouseover",
      () => (tool.style.cssText = `transition: 0.6s; color:${mouseOver};`)
    );
    tool.addEventListener(
      "mouseout",
      () => (tool.style.cssText = `transition: 0.6s; color: ${mouseOut2};`)
    );
  });
}

// ==================

export function clickAnimation(btn) {
  //this for UI
  btn.style.cssText = "animation: bottomDownAndUp 0.6s ;";
  setTimeout(() => (btn.style = ""), 0o700);
}

// ==================

export function dot_is_clicked(btn) {
  if (!isDotEntered) {
    outputEquation.innerHTML = is_it_firstTime()
      ? "0."
      : outputEquation.innerHTML + ".";
    isDotEntered = true;
  }
}

// ==================

export function digit_is_clicked(btn) {
  console.log(is_it_firstTime(), "this is first Number");
  console.log("digit is clicked");
  outputEquation.innerHTML = is_it_firstTime() ? "" : outputEquation.innerHTML;
  outputEquation.innerHTML += btn.innerHTML;
}

// ==================

export function special_is_clicked(btn) {
  /* Rules
  - You can't add (52+++-3) 
  - You can't start the equation like this (/34 + 20)
  - It's okay to do this (-20 + 30)
  - When the user press + here we need to (reset the dot) every sign to be like (10.3 + 10.5 + 0.6) 
  */
  // (dot will never be here) although it is special
  const outputEquArray = outputEquation.innerHTML.split("");
  const isLastSign = /\D/.test(outputEquArray[outputEquArray.length - 1]);
  const isItPlusOrMinus = /[+-]/.test(btn.innerHTML);
  const inputsArr = outputEquation.innerHTML.match(/\d+(\.\d+)?/g); // this pattern of (20.52 or 30)
  const isTwoInputs = inputsArr.length == 2; //this maybe ["20.5", "30"] or ["20.5"]
  // --
  isDotEntered = false;
  if (is_it_firstTime() && isItPlusOrMinus) {
    outputEquation.innerHTML = btn.innerHTML;
  } else if (!is_it_firstTime() && !isLastSign) {
    //is it like 20.5("+" pressed)
    if (isTwoInputs) {
      equal_is_clicked();
      outputEquation.innerHTML = outputResult.innerHTML;
      outputEquation.innerHTML += btn.innerHTML;
    } else {
      outputEquation.innerHTML += btn.innerHTML;
    }
  }
}

// ==================

export function resetting() {
  outputResult.innerHTML = 0.0;
  outputEquation.innerHTML = "Welcome";
  isDotEntered = false;
}

// ==================

export function calc_output(x, y, sign) {
  const floatX = parseFloat(x);
  const floaty = parseFloat(y);
  switch (sign) {
    case "+":
      return floatX + floaty;
    case "-":
      return floatX - floaty;
    case "*":
      return floatX * floaty;
    case "/":
      return (floatX / floaty).toString().split("").length > 4
        ? (floatX / floaty).toFixed(2)
        : floatX / floaty;
  }
}

export function equal_is_clicked() {
  const inputsArr = outputEquation.innerHTML.match(/\d+(\.\d+)?/g); // this pattern of (20.52 or 30)
  const specialSign = outputEquation.innerHTML.match(/[\+\-\/\*]/g)[0]; //this will return "+" "-" "*" "/"

  outputResult.innerHTML = calc_output(inputsArr[0], inputsArr[1], specialSign);
}

function is_it_firstTime() {
  return outputEquation.innerHTML.toLowerCase() == "welcome"; //boolean
}
