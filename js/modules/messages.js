import { resetForm } from './form.js';

const submitButton = document.querySelector('.ad-form__submit');
const successTemplateElement = document.querySelector('#success').content.cloneNode(true);
const successFragmentElement = document.createDocumentFragment();
const errorTemplateElement = document.querySelector('#error').content.cloneNode(true);
const errorFragmentElement = document.createDocumentFragment();
const ERROR_SHOW_TIME = 5000;
const ESC_KEY = 27;

const onPopupEscKeydown = (evt) => {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    document.querySelector('body').removeEventListener('keydown', onPopupEscKeydown);
  }
};

const onClickPopUpClose = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.querySelector('body').removeEventListener('keydown', onPopupEscKeydown);
  resetForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showSuccessModal = () => {

  successFragmentElement.append(successTemplateElement);
  document.body.append(successFragmentElement);
  document.querySelector('body').addEventListener('keydown', onPopupEscKeydown);
  document.querySelector('.success').addEventListener('click', onClickPopUpClose);
};
const showErrorModal = () => {
  errorFragmentElement.append(errorTemplateElement);
  document.body.append(errorFragmentElement);
  document.querySelector('.error').addEventListener('click', onClickPopUpClose);
  document.querySelector('.error__button').addEventListener('click', onClickPopUpClose);
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
  }, ERROR_SHOW_TIME);
};

export { showAlert, blockSubmitButton, unblockSubmitButton, showSuccessModal, showErrorModal };
