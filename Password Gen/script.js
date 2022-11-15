const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const upperCaseLettersArray = [...alphabet];
const lowerCaseLettersArray = [...alphabet.toLowerCase()];
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbolsArray = [];
let resultPassword = [];

function mixArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i - 1));
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}

function generatePassword([uc, lc, num, symb], maxLength) {
  const conformity = {
    uc: upperCaseLettersArray,
    lc: lowerCaseLettersArray,
    num: numbersArray,
    symb: symbolsArray,
  };
  const args = [];
  let tempArr = [];
  if (uc) {
    tempArr = [...tempArr, ...mixArray(upperCaseLettersArray)];
    args.push("uc");
  }
  if (lc) {
    tempArr = [...tempArr, ...mixArray(lowerCaseLettersArray)];
    args.push("lc");
  }
  if (num) {
    tempArr = [...tempArr, ...mixArray(numbersArray)];
    args.push("num");
  }
  if (symb) {
    tempArr = [...tempArr, ...mixArray(resultPassword)];
    args.push("symb");
  }
  if (maxLength <= args.length) {
    const message = "Not valid length!";
    resultPassword = [...message];
    return -1;
  }

  mixArray(tempArr);
  tempArr.length = maxLength;

  let flag = 0;
  let count = 0;
  args.forEach((el) => {
    if (conformity.hasOwnProperty(el)) {
      count++;
      for (let i = 0; i < tempArr.length; i++) {
        if (conformity[el].includes(tempArr[i])) {
          flag++;
          break;
        }
      }
      if (flag !== count) {
        generatePassword([uc, lc, num, symb], maxLength);
      } else {
        resultPassword = [...tempArr];
      }
    }
  });
}

const password = document.querySelector(".password");
const button = document.querySelector(".genBtn");
const inputs = document.querySelectorAll(".checkbox");
const args = [0, 0, 0, 0];
const conformity = {
  uc: 0,
  lc: 1,
  num: 2,
  symb: 3,
};
inputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    if (!input.getAttribute("checked")) {
      input.setAttribute("checked", "checked");
      const index = conformity[input.dataset.name];
      args[index] = input.dataset.name;
    } else {
      input.removeAttribute("checked");
      args[args.indexOf(input.dataset.name)] = 0;
    }
  });
});

const range = document.querySelector('[data-name="length"]');
const output = document.querySelector(".output");
range.addEventListener("change", (e) => {
  output.innerHTML = range.value;
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  generatePassword(args, range.value);
  password.innerHTML = resultPassword.join("");
});
