const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const operate = (x, y, op) => op(x, y);


/* input */
const number = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector(".enter");

/* action */
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

/* output */
const output = document.querySelector("h1");
const history = document.querySelector("h2");
var s = ""


/* event listeners */
number.forEach(num => num.addEventListener("click", () => {
    s += num.textContent;
    output.textContent = s;
}));

operator.forEach(op => op.addEventListener("click", () => {
    s += ` ${op.textContent} `;
    output.textContent = s;
}));

equal.addEventListener("click", () => {
    history.textContent = s;
    let num1 = parseInt(s.slice(0, s.indexOf(" ")));
    let num2 = parseInt(s.slice(s.lastIndexOf(" ") + 1));
    if (s.includes("+"))
        s = operate(num1, num2, add);
    else if (s.includes("-"))
        s = operate(num1, num2, subtract);
    else if (s.includes("x"))
        s = operate(num1, num2, multiply);
    else if (s.includes("÷"))
        s = operate(num1, num2, divide);
    output.textContent = s;
})

clear.addEventListener("click", () => {
    output.textContent = "0";
    history.textContent = "";
    s = "";
})

del.addEventListener("click", () => {
    if (output.textContent !== "0" && s.length !== 1) {
        if (s.charAt(s.length - 1) == " ") {
        s = s.slice(0, -3)
        output.textContent = s;
        } else {
            s = s.slice(0, -1)
            output.textContent = s;
        }
    } else if (s.length == 1) {
        s = ""
        output.textContent = "0";
    }
});