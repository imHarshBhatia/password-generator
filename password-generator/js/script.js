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

// event listeners
generatePasswordBtn.addEventListener('click', generatePassowrd);
lengthSlider.addEventListener('input', showPasswordLength)

function showPasswordLength() {
  passwordLengthValue.innerHTML = lengthSlider.value;
}

function generatePassowrd() {
  let passwordChars = createPasswordChars();
  if (!passwordChars) {
    window.alert('A single type of character needs to be selected for password to be genrated');
    return;
  }
  const passwordCharsLength = passwordChars.length-1;
  let password = '';
  for (let i = 0; i < lengthSlider.value; i++) {
      password += passwordChars[Math.ceil(Math.random() * passwordCharsLength)];
  }
  passwordTextBox.value = password;
}

function createPasswordChars() {
  let passwordChars = '';
  if (symbolsCheckBox.checked) {
    passwordChars += symbols;
  }
  if (numbersCheckBox.checked) {
    passwordChars += numbers;
  }
  if (lowerCaseCheckBox.checked) {
    passwordChars += lowerCase;
  }
  if (upperCaseCheckBox.checked) {
    passwordChars += upperCase;
  }
  return passwordChars;
}
