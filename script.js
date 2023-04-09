const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const operate = (x, y) => {
    if (s.includes("+"))
        return add(x, y);
    else if (s.includes(" - "))
        return subtract(x, y);
    else if (s.includes("x"))
        return multiply(x, y);
    else if (s.includes("÷"))
        return divide(x, y);
};
const containsOperator = () => {
if (Number(s.slice(s.lastIndexOf(" ") + 1)) && (s.includes("+") || s.includes(" - ") || s.includes("x") || s.includes("÷")))
        return true;
    else
        return false;
}


/* input */
const number = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector(".enter");
const decimal = document.querySelector(".decimal");
const plusOrMinus = document.querySelector(".sign");

/* action */
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

/* output */
const output = document.querySelector("h1");
const history = document.querySelector("h2");
var s = ""
var num1;
var num2;


/* event listeners */
number.forEach(num => num.addEventListener("click", () => {
    s += num.textContent;
    output.textContent = s;
}));

operator.forEach(op => op.addEventListener("click", () => {
    s += ` ${op.textContent} `;
    output.textContent = s;
}));

decimal.addEventListener("click", () => {
    if (!s.includes(".")) {
        if (output.textContent == "0")
            s += "0";
        s += ".";
        output.textContent = s;
    }
});

plusOrMinus.addEventListener("click", () => {
    if (output.textContent != 0 && !containsOperator()) {
        num1 = Number(s * -1);
        s = s.replace(s, num1);
        output.textContent = s;
    }
    else if (containsOperator()) {
        num2 = Number(s.slice(s.lastIndexOf(" ") + 1) * -1);
        s = s.replace(` ${s.slice(s.lastIndexOf(" ") + 1)}`, ` ${num2}`);
        output.textContent = s;
    }
})

equal.addEventListener("click", () => {
    history.textContent = s;
    if (output.textContent !== "0" && containsOperator()) {
        num1 = Number(s.slice(0, s.indexOf(" ")));
        num2 = Number(s.slice(s.lastIndexOf(" ") + 1));
        s = Math.round((operate(num1, num2) + Number.EPSILON) * 10 ** 5) / 10 ** 5;
        output.textContent = s;
    }
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