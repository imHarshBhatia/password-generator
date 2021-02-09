var env = 'prod';
const numbers = '0123456789';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '~!@#$%^&*()_+=-~,./?\'";:[]{}\|'
var checkedBoxes = 1;
var rotationDegrees = 0;

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
passwordTextBox.addEventListener('keyup', disablePwdCopy);

//logic functions
function disablePwdCopy() {
  !passwordTextBox.value ? copyPassword.setAttribute('disabled', true) : copyPassword.removeAttribute('disabled');
}

disablePwdCopy();

function showPasswordLength() {
  passwordLengthValue.innerHTML = lengthSlider.value;
}

function generatePassowrd() {
  setTimeout(() => {
    rotateIcon(180);
  }, 0);
  let count = 0;
  let passwordAndChars = createPwdAndChars();
  let password, passwordChars;
  [password, passwordChars] = [passwordAndChars.password, passwordAndChars.passwordChars];
  log(`Password is: ${password}`);
  log(`password chars are ${passwordChars}`);
  if (!passwordChars) {
    window.alert('A single type of character needs to be selected for password to be genrated');
    return;
  }
  const passwordCharsLength = passwordChars.length-1;
  const generatePasswordLength = lengthSlider.value - password.length;
  const noRepetitiveChars = lengthSlider.value < passwordChars.length;
  for (let i = 0; i < generatePasswordLength; i++) {
    log(`Iteration: ${++count}`);
    log(`Inside for loop, password is: ${password}`);
    const generatedPasswordChar = passwordChars[Math.ceil(Math.random() * passwordCharsLength)];
    log(`Generated password char is: ${generatedPasswordChar}`);
    if (noRepetitiveChars) {
      if (password.includes(generatedPasswordChar)) {
        log('Repetitive chars found');
        i--;
        continue;
      }
    }
    log(`sliced char: ${password.slice(-1)}`);
    if (password.slice(-1) === generatedPasswordChar) {
      i--;
      log('Not executing as two chars are same');
      continue;
    }
    password += generatedPasswordChar;
    log(`Password after iteration is: ${password}`);
  }
  passwordTextBox.value = password;
  disablePwdCopy();
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
  log('Called copy');
  passwordTextBox.removeAttribute('disabled');
  passwordTextBox.select();
  passwordTextBox.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.getSelection().removeAllRanges();
  passwordTextBox.setAttribute('disabled', true);
  M.toast({html: 'Password copied to clipboard'});
}



function rotateIcon(angle) {
  rotationDegrees += angle;
  $('#generate-password i').css('transform', 'rotate(' + rotationDegrees + 'deg)');
}

function log(comment) {
  if (env === 'dev') {
    console.log(comment);
  }
}
