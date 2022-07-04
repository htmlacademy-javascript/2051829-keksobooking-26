import { updateSliderOptions } from './no-ui-slider.js';
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
const addForm = document.querySelector('.ad-form');
const pristine = new Pristine(addForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text'
}, true);
const roomsNumberOptionElement = addForm.querySelector('[name="rooms"]');
const capacityNumberOptionElement = addForm.querySelector('[name="capacity"]');
function validateRooms() {
  return MATCH_ROOMS_OPTIONS[roomsNumberOptionElement.value].includes(capacityNumberOptionElement.value);
}
function getRoomsErrorMessage() {
  if (roomsNumberOptionElement.value === '1' && capacityNumberOptionElement.value !== '0') {
    return `для ${roomsNumberOptionElement.value} гостя`;
  }
  if (roomsNumberOptionElement.value === '2' && capacityNumberOptionElement.value !== '0') {
    return `для ${roomsNumberOptionElement.value}-${capacityNumberOptionElement.value} гостей`;
  }
  if (roomsNumberOptionElement.value === '3' && capacityNumberOptionElement.value !== '0') {
    return `для ${roomsNumberOptionElement.value}-${capacityNumberOptionElement.value} гостей`;
  }
  if (capacityNumberOptionElement.value === '0' || roomsNumberOptionElement.value === '100') {
    return 'не для гостей';
  }
}
const typeOfHouseOptionElement = addForm.querySelector('[name="type"]');
const pricePerNightInputElement = addForm.querySelector('[name="price"]');
function validatePriceOfType() {
  return pricePerNightInputElement.min >= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];
}
function getPriceErrorMessage() {
  if (pricePerNightInputElement.value <= MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]) {
    return `минимальная цена ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  }
}
const addressInputElement = addForm.querySelector('[name="address"]');
function validateAddress() {
  if (addressInputElement.value === '') {
    return false;
  } else {
    return true;
  }
}
function getAddressError() {
  return 'Обязательное поле';
}
addForm.addEventListener('submit', (evt) => {
  pristine.addValidator(capacityNumberOptionElement, validateRooms, getRoomsErrorMessage);
  pristine.addValidator(pricePerNightInputElement, validatePriceOfType, getPriceErrorMessage);
  pristine.addValidator(addressInputElement, validateAddress, getAddressError);
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
function onHouseChange() {
  pricePerNightInputElement.min = MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value];
  pricePerNightInputElement.placeholder = `от ${MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]}`;
  updateSliderOptions(MIN_PRICE_OF_HOUSE[typeOfHouseOptionElement.value]);
  pristine.validate(typeOfHouseOptionElement);
}
addForm.querySelectorAll('[name="type"]')
  .forEach((item) => item.addEventListener('change', onHouseChange));
const checkInElement = addForm.querySelector('[name="timein"]');
const checkOutElement = addForm.querySelector('[name="timeout"]');
const onCheckInCHange = (evt) => {
  checkOutElement.value = evt.target.value;
};
checkInElement.addEventListener('change', onCheckInCHange);
const onCheckOutCHange = (evt) => {
  checkInElement.value = evt.target.value;
};
checkOutElement.addEventListener('change', onCheckOutCHange);
