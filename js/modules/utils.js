import { resetMap } from './map.js';
import { updateSliderOptions } from './no-ui-slider.js';
import { resetValidation } from './add-form-validation.js';
const submitButton = document.querySelector('.ad-form__submit');
const successTemplateElement = document.querySelector('#success').content.cloneNode(true);
const successFragmentElement = document.createDocumentFragment();
const errorTemplateElement = document.querySelector('#error').content.cloneNode(true);
const errorFragmentElement = document.createDocumentFragment();
const addFormElement = document.querySelector('.ad-form');
const resetAllButtonElement = document.querySelector('.ad-form__reset');

function onPopupEscKeydown(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    document.querySelector('body').removeEventListener('keydown', onPopupEscKeydown);
    if (document.querySelector('.error')) {
      document.querySelector('.error').removeEventListener('click', onClickPopUpClose);
    }
  }
}

function onClickPopUpClose(evt) {
  evt.target.remove();
  document.querySelector('body').removeEventListener('keydown', onPopupEscKeydown);
  if (document.querySelector('.error')) {
    document.querySelector('.error').removeEventListener('click', onClickPopUpClose);
  }
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = (evt) => {
  evt.preventDefault();
  addFormElement.reset();
  updateSliderOptions(0);
  resetValidation();
  // mapFilters.reset();
  resetMap();
};

resetAllButtonElement.addEventListener('click', resetForm);

const onSuccess = () => {
  successFragmentElement.append(successTemplateElement);
  document.body.append(successFragmentElement);
  document.querySelector('body').addEventListener('keydown', onPopupEscKeydown);
  document.querySelector('.success').addEventListener('click', onClickPopUpClose);
};
const onError = () => {
  errorFragmentElement.append(errorTemplateElement);
  document.body.append(errorFragmentElement);
  document.querySelector('.error').addEventListener('click', onClickPopUpClose);
  document.querySelector('body').addEventListener('keydown', onPopupEscKeydown);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { showAlert, blockSubmitButton, unblockSubmitButton, onSuccess, onError, resetForm };
