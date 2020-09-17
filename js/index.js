const buttons = document.querySelectorAll('span');
const screen = document.querySelector('.screen');

let entries = [],
  result = '',
  op = '';

screen.innerHTML = 0;

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener(
    'click',
    function () {
      if (buttons[i].className === 'clear') {
        screen.innerHTML = 0;
        reset();
      } else {
        if (buttons[i].className != 'operator' && buttons[i].className != 'equals') {
          entries.push(buttons[i].innerHTML);
          screen.innerHTML = doScr(entries);
        }

        if (buttons[i].className === 'operator') {
          op = getOperator(buttons[i].innerHTML);
          entries.push(buttons[i].innerHTML);
        }

        if (buttons[i].className === 'equals') {
          if (result != '') {
            result = doOp(entries);
          } else {
            result = doOperation(entries);
          }

          if (isFinite(result)) {
            screen.innerHTML = result.toFixed(2).replace(/\.?0*$/g, '');
          } else {
            screen.innerHTML = 'N/A';
            reset();
          }
        }
      }
    },
    false,
  );
}

function getOperator(myOp) {
  let theOp = '';
  switch (myOp) {
    case '+':
      theOp = myOp;
      break;
    case '-':
      theOp = myOp;
      break;
    case '/':
      theOp = myOp;
      break;
    case '*':
      theOp = myOp;
      break;
    default:
      break;
  }
  return theOp;
}

function doOp(arr) {
  let myIndex = arr.lastIndexOf(op);
  let list = arr.slice(myIndex, arr.length);
  list.unshift(result);
  let answer = doOperation(list);
  return answer;
}

function doOperation(arr) {
  let n1 = '',
    n2 = '';

  let opReached = false;
  arr.map(function (item) {
    if (item != op && opReached === false) {
      n1 = n1 + item;
    } else {
      if (item === op) opReached = true;
      else {
        n2 = n2 + item;
      }
    }
  });
  if (opReached === true) {
    let ans = calculate(n1, n2, op);
    return ans;
  } else return parseFloat(n1);
}

function calculate(num1, num2, op) {
  let answer = '';
  switch (op) {
    case '+':
      answer = parseFloat(num1) + parseFloat(num2);
      break;
    case '-':
      answer = parseFloat(num1) - parseFloat(num2);
      break;
    case '/':
      answer = parseFloat(num1) / parseFloat(num2);
      break;
    case '*':
      answer = parseFloat(num1) * parseFloat(num2);
      break;
  }
  return answer;
}

function doScr(arr) {
  let myIndex = arr.lastIndexOf(op);
  let list = arr.slice(myIndex + 1, arr.length);
  return list.join('');
}

function reset() {
  result = '';
  entries = [];
  op = '';
}
