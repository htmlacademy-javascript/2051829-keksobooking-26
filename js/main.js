'use strict';
const AVATARS_IMG = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const FEATURE_OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
const HOUSE_DESCRIPTIONS = [
  'Комфортное жилье со всем необходимым',
  'Стильное жилье с удобствами',
  'Больше, чем место для сна',
  'Недавно произведен ремонт',
]
const HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel']
const TIME_CHECK_IN_OUTS = ['12:00', '13:00', '14:00']
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
]
const COORDINATES = {
  lat: [35.65000, 35.70000],
  lng: [139.70000, 139.80000]
}
const createSuggest = () => {
  const getAvatarImgUrl = 'img/avatars/user'
    + `${getRandomPositiveInteger(1, AVATARS_IMG.length - 1) < 10
      ? '0' + getRandomPositiveInteger(1, AVATARS_IMG.length - 1)
      : getRandomPositiveInteger(1, AVATARS_IMG.length - 1)}`
    + '.png';
  function getRandomPositiveInteger(a, b) {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  }
  function getRandomPositiveFloat(a, b, digits = 5) {
    const lower = Math.min(Math.abs(a), Math.abs(b));
    const upper = Math.max(Math.abs(a), Math.abs(b));
    const result = Math.random() * (upper - lower) + lower;
    return +result.toFixed(digits);
  }
  function getManyOptions(options) {
    const maxLength = options.length;
    const lengthOfNewArr = getRandomPositiveInteger(1, maxLength);
    const array = [];
    while (array.length < lengthOfNewArr) {
      const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
      const el = options[indexOfEl];
      if (!array.includes(el)) {
        array.push(el);
      }
    }
    return array;
  }
  function getOneOption(options) {
    const maxLength = options.length;
    const lengthOfNewArr = 1;
    const array = [];
    while (array.length < lengthOfNewArr) {
      const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
      const el = options[indexOfEl];
      array.push(el);
    }
    return array;
  }
  const getLat = getRandomPositiveFloat(COORDINATES.lat[0], COORDINATES.lat[1]);
  const getLng = getRandomPositiveFloat(COORDINATES.lng[0], COORDINATES.lng[1]);
  return {
    author: {
      avatar: getAvatarImgUrl
    },
    offer: {
      title: 'Объявление',
      address: getLat + ',' + getLng,
      price: getRandomPositiveInteger(100, 999),
      type: getOneOption(HOUSE_TYPES),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getOneOption(TIME_CHECK_IN_OUTS),
      checkout: getOneOption(TIME_CHECK_IN_OUTS),
      features: getManyOptions(FEATURE_OPTIONS),
      description: String(getOneOption(HOUSE_DESCRIPTIONS)),
      photos: getManyOptions(PHOTOS)
    },
    location: {
      lat: getLat,
      lng: getLng
    }
  }
};
function generateManySuggestions(count) {
  const Arr = [];
  while (Arr.length <= count) {
    const el = createSuggest();
    Arr.push(el);
  }
  return Arr
}
