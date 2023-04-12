const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const operate = (x, y) => {
    if (term[1] == ("+")) return add(x, y);
    else if (term[1] == ("-")) return subtract(x, y);
    else if (term[1] == ("x")) return multiply(x, y);
    else if (term[1] == ("÷")) return divide(x, y);
};
const containsOperator = () => {
return s.includes("+") || s.includes(" - ") || s.includes("x") || s.includes("÷");
}

/* style */
const button = document.querySelectorAll("button");

/* input */
const number = document.querySelectorAll(".num");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector(".enter");
const decimal = document.querySelector(".decimal");
const plusOrMinus = document.querySelector(".sign");
const percentage = document.querySelector(".percentage");
const sqrt = document.querySelector(".sqrt");

/* action */
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

/* output */
const output = document.querySelector("h1");
const history = document.querySelector("h2");
var s = ""
var num1;
var num2;
var term;


/* event listeners */

button.forEach(btn => btn.addEventListener("mousedown", () => {
    btn.style.borderStyle = "outset";
}));

button.forEach(btn => btn.addEventListener("mouseup", () => {
    btn.style.borderStyle = "inset";
}))

number.forEach(num => num.addEventListener("click", () => {
    if (s.length < 15) {
        s += num.textContent;
        output.textContent = s;
    }
}));

operator.forEach(op => op.addEventListener("click", () => {
    if (s.split(" ").length == 3 && s !== "Infinity") {
        ENTER();
        s += ` ${op.textContent} `;
        output.textContent = s;
    }
    else if (s.lastIndexOf(" ") !== s.length - 1 && s.split(" ").length < 3) {
        s += ` ${op.textContent} `;
        output.textContent = s;
    } 
    else if (output.textContent == "0") {
        s += `0 ${op.textContent} `;
        output.textContent = s;
    }
}));

percentage.addEventListener("click", PER = () => {
    if (output.textContent != 0 && !containsOperator()) {
        num1 = Number(s / 100);
        num1 = Math.round((num1 + Number.EPSILON) * 10 ** 7) / 10 ** 7;
        s = s.replace(s, num1);
        output.textContent = s;
    }
    else if (containsOperator() && s.lastIndexOf(" ") != s.length - 1) {
        num2 = Number(s.slice(s.lastIndexOf(" ") + 1) / 100);
        num2 = Math.round((num2 + Number.EPSILON) * 10 ** 7) / 10 ** 7;
        s = s.replace(` ${s.slice(s.lastIndexOf(" ") + 1)}`, ` ${num2}`);
        output.textContent = s;
    }
});

sqrt.addEventListener("click", SQRT = () => {
    if (output.textContent != 0 && !containsOperator()) {
        num1 = Math.sqrt(Number(s));
        num1 = Math.round((num1 + Number.EPSILON) * 10 ** 7) / 10 ** 7;
        s = s.replace(s, num1);
        output.textContent = s;
    }
    else if (containsOperator() && s.lastIndexOf(" ") != s.length - 1) {
        num2 = Math.sqrt(Number(s.slice(s.lastIndexOf(" ") + 1)));
        num2 = Math.round((num2 + Number.EPSILON) * 10 ** 7) / 10 ** 7;
        s = s.replace(` ${s.slice(s.lastIndexOf(" ") + 1)}`, ` ${num2}`);
        output.textContent = s;
    }
})

decimal.addEventListener("click", POINT = () => {
    if (output.textContent == "0") {
        s = "0.";
        output.textContent = s;
    } 
    else if (!s.includes(".") || s.lastIndexOf(".") < s.lastIndexOf(" ")){
        s += ".";
        output.textContent = s;
    }
});

plusOrMinus.addEventListener("click", SIGN = () => {
    if (output.textContent != 0 && !containsOperator()) {
        num1 = Number(s * -1);
        s = s.replace(s, num1);
        output.textContent = s;
    }
    else if (containsOperator() && s.lastIndexOf(" ") != s.length - 1) {
        num2 = Number(s.slice(s.lastIndexOf(" ") + 1) * -1);
        s = s.replace(` ${s.slice(s.lastIndexOf(" ") + 1)}`, ` ${num2}`);
        output.textContent = s;
    }
})

equal.addEventListener("click", ENTER = () => {
    history.textContent = s;
    term = s.split(" ");
    if (output.textContent !== "0" && containsOperator()) {
        num1 = Number(term[0]);
        num2 = Number(term[2]);
        s = Math.round((operate(num1, num2) + Number.EPSILON) * 10 ** 7) / 10 ** 7;
        if (s == "Infinity") { 
            output.textContent = "UNDEFINED";
            s = "";
        }
        else {
            output.textContent = s;
            s = output.textContent;
        }
    }
})

clear.addEventListener("click", CLEAR = () => {
    output.textContent = "0";
    history.textContent = "";
    s = "";
})

del.addEventListener("click", DELETE = () => {
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

/* key events */

window.addEventListener("keydown", e => {
    if (Number(e.key) >= 0 && s.length < 15) {
        s += e.key;
        output.textContent = s;
    }
    else if (e.key == ".") POINT();
    else if (e.key == "%") PER();
    else if (e.key == "_") SQRT();
    else if (e.key == "s") SIGN();
    else if (e.key == "c") CLEAR();
    else if (e.key == "Enter" || e.key == "=") ENTER();
    else if (e.key == "Backspace" || e.key == "Delete") DELETE();
    else {
        let op = ["+", "-", "*", "/"];
        for (let i = 0; i < op.length; i++) {
            if (op[i] == e.key) {
                op[2] = "x";
                op[3] = "÷";
                if (s.split(" ").length == 3 && s !== "Infinity") {
                    ENTER();
                    s += ` ${op[i]} `;
                    output.textContent = s;
                }
                else if (s.lastIndexOf(" ") !== s.length - 1 && s.split(" ").length < 3) {
                    s += ` ${op[i]} `;
                    output.textContent = s;
                } 
                else if (output.textContent == "0") {
                    s += `0 ${op[i]} `;
                    output.textContent = s;
                }
            }
        }
    }
});