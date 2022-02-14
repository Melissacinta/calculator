const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const del = document.querySelector('.del');
const reset = document.querySelector('.reset');
const output = document.querySelector('.output');
const dot = document.querySelector('.dot');
const caltns = document.querySelector('.calculations');
let oprands = [];
let symbols = [];

function displayText() {
  if (output.innerText === '0') {
    output.textContent = this.textContent;
  } else {
    if (this.textContent === '.' && output.textContent.includes('.')) {
      return;
    } else {
      output.textContent += this.textContent;
    }
  }
}
del.addEventListener('click', function () {
  output.textContent = output.textContent.slice(
    0,
    output.textContent.length - 1
  );
});
reset.addEventListener('click', function () {
  output.textContent = '0';
  caltns.textContent = '';
  oprands = [];
  symbols = [];
});
numbers.forEach((number) => {
  number.addEventListener('click', displayText);
});

operators.forEach((operator) => {
  operator.addEventListener('click', function () {
    if (this.textContent === '=' && oprands.length < 1) {
      return;
    } else {
      if (this.textContent === '=') {
        result = operate(symbols[0], oprands[0], output.textContent);
        output.textContent = result;
        oprands = [result];
        symbols.pop();
        caltns.textContent = '';
      } else {
        oprands.push(output.textContent);
        symbols.push(this.textContent);
        caltns.textContent += output.textContent + ' ' + this.textContent;
        let len = oprands.length;
        output.textContent = ' ';

        while (symbols.length > 1) {
          result = operate(symbols[0], oprands[len - 2], oprands[len - 1]);
          caltns.textContent = result + ' ' + this.textContent;
          symbols.shift();
          oprands = [result];
        }
      }
    }
  });
});

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (operator, c, d) {
  c = Number(c);
  d = Number(d);
  if (operator === '+') {
    return add(c, d);
  } else if (operator == '-') {
    return subtract(c, d);
  } else if (operator == 'x') {
    return multiply(c, d);
  } else if (operator == '/') {
    return divide(c, d);
  }
};
