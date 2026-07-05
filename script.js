let totalData = "";
const getButtonData = document.querySelectorAll(".btn");
let display = document.querySelector(".display");
let operator = ["/", "*", "-", "+", "%"];
let lastOperator = "";
const buttonClick = (btn) => {
  btn.addEventListener("click", () => {
    if (btn.innerText === "AC") {
      totalData = "0.0";
    } else if (btn.innerText === "C") {
      //Assign 0.0 to totalData if it empty
      totalData = totalData.slice(0, -1) || "0.0";
    } else if (btn.innerText === ".") {
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
        totalData += btn.innerText;
      }
      if (totalData === "0.0" || display.innerText === "0.0") {
        totalData = btn.innerText;
      } else {
        if (totalData.includes(".")) {
          // check the total for begining input number has dot or not  and
          //Check if lastString is not empty without dot
          dot = lastString ? btn.innerText : "";
          // dot = "";
          //console.log("dote", totalData);
        } else {
          //Get dot from html when the total number dont have dot (12-85 or 152), but not 1 digit

          dot = btn.innerText;
        }
      }
      totalData += dot;
    } else if (operator.includes(btn.innerText)) {
      //totalData += btn.innerText;
      //get the last operator when user clicked
      lastOperator = btn.innerText;

      if (display.innerText !== "0.0") {
        //console.log(totalData);
        let lastChar = totalData.slice(-1);
        if (operator.includes(lastChar)) {
          //Replace a new operator when click on it multiple time, to show only one time
          totalData = totalData.slice(0, -1) + btn.innerText;
        } else {
          totalData += btn.innerText;
        }
      } else {
        //totalData will assigin operator when it has 0.0
        totalData = btn.innerText;
      }
    } else if (btn.innerText === "=") {
      //convert eval back to string
      if (!operator.includes(totalData.slice(-1))) {
        totalData = String(eval(totalData));
      }
    } else {
      if (totalData === "0.0") {
        totalData = btn.innerText;
      } else {
        totalData += btn.innerText;
      }
    }
    displayResult();
  });
};

const buttonMouseDown = (btn) => {
  btn.addEventListener("mousedown", () => {
    btn.classList.add("btn");
    // console.log("press");
  });
};

getButtonData.forEach((btn) => {
  buttonClick(btn);
  buttonMouseDown(btn);
});

const displayResult = () => {
  display.innerText = totalData;
};
