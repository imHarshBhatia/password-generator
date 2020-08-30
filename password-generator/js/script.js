const passwordChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`-=~!@#$%^&*()_+?><,./\';:"][{}"';
const passwordCharsLength = passwordChars.length-1;

// elements
const generatePasswordBtn = document.querySelector('#generate-password');
const lengthSlider = document.querySelector('#length-slider');
const passwordTextBox = document.querySelector('#password');

// event listeners
generatePasswordBtn.addEventListener('click', generatePassowrd);

function generatePassowrd() {
  let password = '';
  for (let i = 0; i < lengthSlider.value; i++) {
      password += passwordChars[Math.ceil(Math.random() * passwordCharsLength)];
  }
  passwordTextBox.value = password;
}