const numbers = '0123456789';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '~!@#$%^&*()_+=-~,./?\'";:[]{}\|'
var checkedBoxes = 1;

// elements
const generatePasswordBtn = document.querySelector('#generate-password');
const lengthSlider = document.querySelector('#length-slider');
const passwordTextBox = document.querySelector('#password');
const passwordLengthValue = document.querySelector('#length-slider-value');
const symbolsCheckBox = document.querySelector('#symbols');
const numbersCheckBox = document.querySelector('#numbers');
const lowerCaseCheckBox = document.querySelector('#lowercase');
const upperCaseCheckBox = document.querySelector('#uppercase');
const copyPassword = document.querySelector('#copy-password');

// event listeners
generatePasswordBtn.addEventListener('click', generatePassowrd);
lengthSlider.addEventListener('input', showPasswordLength);
copyPassword.addEventListener('click', copyPasswordToClipBoard);


//logic functions
function showPasswordLength() {
  passwordLengthValue.innerHTML = lengthSlider.value;
}

function generatePassowrd() {
  let count = 0;
  let passwordAndChars = createPwdAndChars();
  let password, passwordChars;
  [password, passwordChars] = [passwordAndChars.password, passwordAndChars.passwordChars];
  console.log(`Password is: ${password}`);
  console.log(`password chars are ${passwordChars}`);
  if (!passwordChars) {
    window.alert('A single type of character needs to be selected for password to be genrated');
    return;
  }
  const passwordCharsLength = passwordChars.length-1;
  const generatePasswordLength = lengthSlider.value - password.length;
  const noRepetitiveChars = lengthSlider.value < passwordChars.length;
  for (let i = 0; i < generatePasswordLength; i++) {
    console.log(`Iteration: ${++count}`);
    console.log(`Inside for loop, password is: ${password}`);
    const generatedPasswordChar = passwordChars[Math.ceil(Math.random() * passwordCharsLength)];
    console.log(`Generated password char is: ${generatedPasswordChar}`);
    if (noRepetitiveChars) {
      if (password.includes(generatedPasswordChar)) {
        console.log('Repetitive chars found');
        i--;
        continue;
      }
    }
    console.log(`sliced char: ${password.slice(-1)}`);
    if (password.slice(-1) === generatedPasswordChar) {
      i--;
      console.log('Not executing as two chars are same');
      continue;
    }
    password += generatedPasswordChar;
    console.log(`Password after iteration is: ${password}`);
  }
  passwordTextBox.value = password;
}

function createPwdAndChars() {
  var password = '';
  let passwordChars = '';

  let addPasswordChar = function(characterList) {
    return characterList[Math.floor(Math.random() * characterList.length)];
  }

  if (symbolsCheckBox.checked) {
    password += addPasswordChar(symbols);
    passwordChars += symbols;
  }
  if (upperCaseCheckBox.checked) {
    password += addPasswordChar(upperCase);
    passwordChars += upperCase;
  }
  if (numbersCheckBox.checked) {
    password += addPasswordChar(numbers);
    passwordChars += numbers;
  }
  if (lowerCaseCheckBox.checked) {
    password += addPasswordChar(lowerCase);
    passwordChars += lowerCase;
  }
  return {password, passwordChars};
}

function copyPasswordToClipBoard() {
  console.log('Called copy');
  passwordTextBox.select();
  passwordTextBox.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.getSelection().removeAllRanges();
}
