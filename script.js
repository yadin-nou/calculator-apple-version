let totalData = "";
const getButtonData = document.querySelectorAll(".btn");
let display = document.querySelector(".display");
let operator = ["/", "*", "-", "+", "%"];
let lastOperator = "";
const audioPlay = new Audio("./assists/aa.wav");
const buttonClick = (btn, btnValue) => {
  btn.addEventListener("click", () => {
    display.classList.remove("prank");
    calculatorAction(btnValue);
  });
};

const buttonMouseDown = (btn) => {
  btn.addEventListener("mousedown", () => {
    btn.classList.add("btn");
  });
};

getButtonData.forEach((btn) => {
  buttonClick(btn, btn.innerText);
  buttonMouseDown(btn);
});

const displayResult = () => {
  display.innerText = totalData;
};
const calculatorAction = (btnValue) => {
  if (btnValue === "AC") {
    totalData = "0.0";
  } else if (btnValue === "C" || btnValue === "Backspace") {
    //Assign 0.0 to totalData if it empty
    totalData = totalData.slice(0, -1) || "0.0";
  } else if (btnValue === ".") {
    let dot = "";
    let lastOperatorIndex = "";
    operator.forEach((item) => {
      if (totalData.includes(item)) {
        //LastIndexOf is return index of totalData which contain operator
        lastOperatorIndex = totalData.lastIndexOf(lastOperator);
      }
    }); //End ForEach
    //Get the last string of totalData from the last operator click to the end
    //The operator will not include the last string when we plus +1
    let lastString = totalData.slice(lastOperatorIndex + 1);
    if (lastString.includes(".")) {
      //Return nothing when the dot exist
      return;
    }
    //if total hasn't dot , assign dot from innerText
    if (lastString === "") {
      totalData += btnValue;
    }
    if (totalData === "0.0" || display.innerText === "0.0") {
      totalData = btnValue;
    } else {
      if (totalData.includes(".")) {
        // check the total for begining input number has dot or not  and
        //Check if lastString is not empty without dot
        dot = lastString ? btnValue : "";
        // dot = "";
        //console.log("dote", totalData);
      } else {
        //Get dot from html when the total number dont have dot (12-85 or 152), but not 1 digit

        dot = btnValue;
      }
    }
    totalData += dot;
  } else if (operator.includes(btnValue)) {
    //totalData += btn.innerText;
    //get the last operator when user clicked
    lastOperator = btnValue;

    if (display.innerText !== "0.0") {
      //console.log(totalData);
      let lastChar = totalData.slice(-1);
      if (operator.includes(lastChar)) {
        //Replace a new operator when click on it multiple time, to show only one time
        totalData = totalData.slice(0, -1) + btnValue;
      } else {
        totalData += btnValue;
      }
    } else {
      //totalData will assigin operator when it has 0.0
      totalData = btnValue;
    }
  } else if (btnValue === "=" || btnValue === "Enter") {
    display.classList.remove("prank");
    //convert eval back to string
    if (!operator.includes(totalData.slice(-1))) {
      totalData = String(eval(totalData));
      console.log(RandomValue(), totalData);
      if (totalData === String(RandomValue())) {
        display.classList.add("prank");
        audioPlay.play();
      }
    }
  } else {
    if (totalData === "0.0") {
      totalData = btnValue;
    } else {
      totalData += btnValue;
    }
  }
  displayResult();
};
const RandomValue = () => {
  const num = Math.floor(Math.random() * 10);
  //console.log(num);
  return num;
};

const keyAllowed = "0123456789+-*/.%Enter";
document.addEventListener("keypress", (e) => {
  const value = e.key;
  if (keyAllowed.includes(e.key)) {
    display.classList.remove("prank");
    calculatorAction(value);
  }
});
