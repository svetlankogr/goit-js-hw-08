import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();

  const result = localStorage.getItem(STORAGE_KEY);
  console.log(JSON.parse(result));

  localStorage.removeItem(STORAGE_KEY);
}

savedInput();
function savedInput() {
  const savedMassage = localStorage.getItem(STORAGE_KEY);
  const parsedSavedMassage = JSON.parse(savedMassage);
  if (savedMassage) {
    for (let key of form) {
      key.value = parsedSavedMassage[key.name];
      formData[key.name] = parsedSavedMassage[key.name];
    }
  }
}
