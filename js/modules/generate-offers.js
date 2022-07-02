import {
  getRandomArrayElements,
  getRandomInteger,
  getRandomFloat
} from './utils.js';
const FEATURE_OPTIONS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const HOUSE_DESCRIPTIONS = [
  'Комфортное жилье со всем необходимым',
  'Стильное жилье с удобствами',
  'Больше, чем место для сна',
  'Недавно произведен ремонт',
];
const HOUSE_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const TIME_CHECK_IN_OUTS = [
  '12:00',
  '13:00',
  '14:00'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const COORDINATE_RANGES = {
  lat: [35.65000, 35.70000],
  lng: [139.70000, 139.80000]
};
const createOffer = (index) => {
  const lat = getRandomFloat(COORDINATE_RANGES.lat[0], COORDINATE_RANGES.lat[1]);
  const lng = getRandomFloat(COORDINATE_RANGES.lng[0], COORDINATE_RANGES.lng[1]);
  const checkInTime = TIME_CHECK_IN_OUTS[getRandomInteger(0, TIME_CHECK_IN_OUTS.length - 1)];
  return {
    author: {
      avatar: `${'img/avatars/user'}${index < 10 ? `${'0'}${index + 1}` : index}${'.png'}`
    },
    offer: {
      title: 'Объявление',
      address: `${lat}, ${lng}`,
      price: getRandomInteger(1000, 9999),
      type: HOUSE_TYPES[getRandomInteger(0, HOUSE_TYPES.length - 1)],
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: checkInTime,
      checkout: checkInTime,
      features: getRandomArrayElements(FEATURE_OPTIONS),
      description: HOUSE_DESCRIPTIONS[getRandomInteger(0, HOUSE_DESCRIPTIONS.length - 1)],
      photos: getRandomArrayElements(PHOTOS)
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};
function generateOffers(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(createOffer(i));
  }
  return result;
}
export { generateOffers};
