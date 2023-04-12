const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const operate = (x, y) => {
    if (term[1] == ("+"))
        return add(x, y);
    else if (term[1] == ("-"))
        return subtract(x, y);
    else if (term[1] == ("x"))
        return multiply(x, y);
    else if (term[1] == ("÷"))
        return divide(x, y);
};
const containsOperator = () => {
if (s.includes("+") || s.includes(" - ") || s.includes("x") || s.includes("÷"))
        return true;
    else
        return false;
}



/* style */
const button = document.querySelectorAll("button");

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
var term;


/* event listeners */

button.forEach(btn => btn.addEventListener("mousedown", () => {
    btn.style.borderStyle = "outset";
}));

button.forEach(btn => btn.addEventListener("mouseup", () => {
    btn.style.borderStyle = "inset";
}))

number.forEach(num => num.addEventListener("click", () => {
    s += num.textContent;
    output.textContent = s;
}));

operator.forEach(op => op.addEventListener("click", () => {
    if (s.lastIndexOf(" ") !== s.length - 1) {
        s += ` ${op.textContent} `;
        output.textContent = s;
    } 
    else if (output.textContent == "0") {
        s += `0 ${op.textContent} `;
        output.textContent = s;
    }
}));

decimal.addEventListener("click", () => {
    if (output.textContent == "0") {
        s = "0.";
        output.textContent = s;
    } 
    else if (!s.includes(".") || s.lastIndexOf(".") < s.lastIndexOf(" ")){
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
    else if (containsOperator() && s.lastIndexOf(" ") != s.length - 1) {
        num2 = Number(s.slice(s.lastIndexOf(" ") + 1) * -1);
        s = s.replace(` ${s.slice(s.lastIndexOf(" ") + 1)}`, ` ${num2}`);
        output.textContent = s;
    }
})

const containsMultiple = () => {
    term = s.split(" ");
    if (s.split(" ").length - 1 > 2) {
        num1 = Number(term[0]);
        console.log(num1);
        num2 = Number(term[2]);
        console.log(num2);
        let temp = s;
        console.log(temp);
        s = Math.round((operate(num1, num2) + Number.EPSILON) * 10 ** 5) / 10 ** 5;
        console.log(s);
        s = temp.replace(`${term[0]} ${term[1]} ${term[2]}`, s)
        console.log(s);
        return containsMultiple();
    }
    else if (s.split(" ").length - 1 == 2) {
        num1 = Number(term[0]);
        console.log(num1);
        num2 = Number(term[2]);
        console.log(num2);
        s = Math.round((operate(num1, num2) + Number.EPSILON) * 10 ** 5) / 10 ** 5;
    }
}

equal.addEventListener("click", () => {
    history.textContent = s;
    if (output.textContent !== "0" && containsOperator()) {
        containsMultiple()
        output.textContent = s;
        s = output.textContent;
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