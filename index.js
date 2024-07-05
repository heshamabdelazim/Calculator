let calculatorHead = document.querySelector(".calculator-parent .head");
let DLInput = document.querySelector(".calculator-parent .head input");
let calculatorLabel = document.querySelector(".calculator-parent .head")
  .children[2];
let calculatorParentBottom = document.querySelector(
  ".calculator-parent .parent-bottom"
);
let calculatorTools = document.querySelectorAll(
  ".calculator-parent .tools div i"
);
let calculatorBottons = document.querySelectorAll(
  ".calculator-parent .buttons div"
);
let outputEquation = document.querySelector(".calculator-parent .output-parent")
  .children[0];
let outputResult = document.querySelector(".calculator-parent .output-parent")
  .children[1];

let toShow = []; //it contains all pressed buttons  except = && ac , the user see toShow joined together

let onlyNumbers = []; //it contains all pressed button numbers also dot. When the user press any operator || = , the numbers joined together then sending it to arrayResult
let joined = 0; // when the user press any operator || = it join onlyNumbers then sending it to arrayResult

let arrayResult = []; // when the user press any operator || = , that array receive number pressed eariler then doing the operation inside
let result = 0; //it's equal arrayResult[0] and shown to the user

let interactions = 0;

DLInput.addEventListener("change", (event) => {
  console.log(event.target); //DLIntput
  if (event.target.checked) {
    //it's also => DLIntput.checked
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

function darkAndLight(
  parentBackground,
  buttonColor,
  label,
  mouseOver,
  mouseOut,
  mouseOut2
) {
  calculatorParentBottom.style.cssText = `transition: 0.6s; background-color: ${parentBackground};`;
  calculatorBottons.forEach((button) => {
    button.style.cssText = `color:${buttonColor};`;
    calculatorLabel.innerHTML = `${label}`;
    button.addEventListener(
      "mouseover",
      () => (button.style.cssText = `transition: 0.6s; color:${mouseOver};`)
    );
    button.addEventListener(
      "mouseout",
      () => (button.style.cssText = `transition: 0.6s; color:${mouseOut};`)
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

//adding class Number to all numbers
calculatorBottons.forEach((button) => {
  isNaN(parseInt(button.innerHTML)) ? button : button.classList.add("number"); //class added to numbers

  button.addEventListener("click", (event) => {
    button.style.cssText = "animation: bottomDownAndUp 0.6s ;";
    setTimeout(() => (button.style = ""), 0o700);

    //-------ending to show for the user-------

    button.innerHTML == "=" ? button : toShow.push(button.innerHTML);
    console.log(toShow);
    outputEquation.innerHTML = toShow.join(""); //the equation just to show for the user
    //-------ending to show for the user-------

    //---------------------------starting programming---------------------

    //onlyNumbers is array that numbers pushed inside it ,later the array will join together to another variable
    button.classList.contains("number") || button.innerHTML == "."
      ? onlyNumbers.push(button.innerHTML)
      : button;
    console.log(onlyNumbers);
    joined = onlyNumbers.join("");
    //the onlyNumbers modifies the data before sending => it makes the variable joined
    //when the user press "+" => onlyNumbers will be empty and data will send to the array=>arrayResult
    //then the function sum(...) had some data to work
    for (i = toShow.length - 1; i >= 0; i--) {
      if (isNaN(parseInt(toShow[i])) && toShow[i] != ".") {
        //if operators found (first index)
        sendingData(); //when the looping find an whatever operator whatever it is, just only (Sending data) to resultArray
        for (i = toShow.length - 2; i >= 0; i--) {
          //this to know what kind of operator before. (Example) when you write 20 + 30 - 5 //So when you press the minus (-), It loop backward then finding + then make addition but don't forget toShow didn't change here it change at the end
          if (isNaN(parseInt(toShow[i])) && toShow[i] != ".") {
            console.log(`this is inside nested ${toShow[i]}`);
            operation(toShow[i]);
            break;
          }
        }
        break;
      }
      break;
    }
    if (button.innerHTML == "ac") {
      outputResult.innerHTML = 0;
      outputEquation.innerHTML = "";
      receivedData = [];
      toShow = [];
      arrayResult = [];
    }
    if (button.innerHTML == "=") {
      sendingData();
      for (i = toShow.length - 1; i > 0; i--) {
        operation(toShow[i]); //identifying the operator then making calculations
      }
    }
    arrayResult.length == 0 ? (result = joined) : (result = arrayResult[0]);
    outputResult.innerHTML = result;
    console.log(`toShow before ${toShow}`);

    //the following codes to just showing not calculator
    for (i = toShow.length - 1; i > 0; i--) {
      if (isNaN(parseInt(toShow[i])) && toShow[i] != ".") {
        toShow = [result, toShow[i]];
        outputEquation.innerHTML = toShow.join("");
      }
      break;
    }
  });
});

// joining(); //when the user press + the OnlyNumbers will join and sending the data to another empty array to addition

function sum(...el) {
  let submition = el.reduce((acc, curr) => +acc + +curr);
  return submition;
}
function sub(...el) {
  let substract = el.reduce((acc, curr) => +acc - +curr);
  return substract;
}
function multi(...el) {
  let multiply = el.reduce((acc, curr) => +acc * +curr);
  return multiply;
}
function devid(...el) {
  let deviding = el.reduce((acc, curr) => +acc / +curr);
  return deviding;
}

function operation(operator) {
  if (operator == "+") {
    return (arrayResult = [sum(...arrayResult)]);
  }
  if (operator == "-") {
    return (arrayResult = [sub(...arrayResult)]);
  }
  if (operator == "*") {
    return (arrayResult = [multi(...arrayResult)]);
  }
  if (operator == "/") {
    return (arrayResult = [devid(...arrayResult)]);
  }
}

function sendingData() {
  arrayResult.push(joined);
  onlyNumbers = [];
}
