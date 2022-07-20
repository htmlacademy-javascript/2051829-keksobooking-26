import { updateSliderOptions } from './no-ui-slider.js';
import { sendData } from './fetch-api.js';
import { blockSubmitButton, showAlert, showErrorModal, showSuccessModal, unblockSubmitButton } from './messages.js';
import { resetForm } from './form.js';

const MATCH_ROOMS_OPTIONS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const MIN_PRICE_OF_HOUSE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const addFormElement = document.querySelector('.ad-form');
const roomsSelectElement = addFormElement.querySelector('#room_number');
const capacitySelectElement = addFormElement.querySelector('#capacity');
const typeOfHouseOptionElement = addFormElement.querySelector('#type');
const pricePerNightInputElement = addFormElement.querySelector('#price');
const addressInputElement = addFormElement.querySelector('#address');
const checkInElement = addFormElement.querySelector('#timein');
const checkOutElement = addFormElement.querySelector('#timeout');
const titleInputElement = addFormElement.querySelector('#title');

const pristine = new Pristine(addFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text'
}, true);

const resetValidation = () => pristine.reset();

const validateTitle = () => {
  const titleTrimmed = titleInputElement.value.trim();
  return titleTrimmed.length >= 30 && titleTrimmed.length <= 100;
};

const getTitleError = () => 'Введите от 30 до 100 символов, без лишних пробелов в начале и в конце';

const onHouseChange = () => {
  pricePerNightInputElement.min = MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];
  pricePerNightInputElement.placeholder = `от ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  updateSliderOptions(MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]);
  pristine.validate(typeOfHouseOptionElement);
};

const validateRooms = () => MATCH_ROOMS_OPTIONS[roomsSelectElement.value].includes(capacitySelectElement.value);

const getRoomsErrorMessage = () => {
  if (roomsSelectElement.value === '1' && capacitySelectElement.value !== '0') {
    return `для ${roomsSelectElement.value} гостя`;
  }
  if (roomsSelectElement.value === '2' && capacitySelectElement.value !== '0') {
    return `для ${roomsSelectElement.value} гостей`;
  }
  if (roomsSelectElement.value === '3' && capacitySelectElement.value !== '0') {
    return `для ${roomsSelectElement.value}-${capacitySelectElement.value} гостей`;
  }
  if (capacitySelectElement.value === '0' || roomsSelectElement.value === '100') {
    return 'не для гостей';
  }
};

const validateAddress = () => addressInputElement.value !== '';

const validatePriceOfType = () => pricePerNightInputElement.value >= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];

const getPriceErrorMessage = () => {
  if (pricePerNightInputElement.value <= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]) {
    return `минимальная цена ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  }
};

const onCheckInCHange = (evt) => {
  checkOutElement.value = evt.target.value;
};

const onCheckOutChange = (evt) => {
  checkInElement.value = evt.target.value;
};

const onFormSubmitSuccess = () => {
  showSuccessModal();
  unblockSubmitButton();
  resetForm();
};
const onFormSubmitError = () => {
  showErrorModal();
  unblockSubmitButton();
};
const onConnectionError = (error) => {
  showAlert(`Ошибка загрузки данных, попробуйте обновить страницу. ${error}`);
};

const onUserFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      new FormData(evt.target),
      onFormSubmitSuccess,
      onFormSubmitError,
      onConnectionError);
  }
};

const activateFormValidation = () => {
  pristine.addValidator(titleInputElement, validateTitle, getTitleError, 2, true);
  pristine.addValidator(capacitySelectElement, validateRooms, getRoomsErrorMessage);
  pristine.addValidator(pricePerNightInputElement, validatePriceOfType, getPriceErrorMessage);
  pristine.addValidator(addressInputElement, validateAddress, 'Обязательное поле');
  addFormElement.addEventListener('submit', onUserFormSubmit);
  addFormElement.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onHouseChange));
  checkInElement.addEventListener('change', onCheckInCHange);
  checkOutElement.addEventListener('change', onCheckOutChange);
};

export { activateFormValidation, resetValidation };
