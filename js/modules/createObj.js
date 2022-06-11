import {
  COORDINATE_RANGES,
  TIME_CHECK_IN_OUTS,
  HOUSE_DESCRIPTIONS,
  HOUSE_TYPES,
  PHOTOS,
  FEATURE_OPTIONS
} from './static.js';
import {
  getRandomArrayElements,
  getRandomInteger,
  getRandomFloat
} from './getRandom.js';

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
      price: getRandomInteger(100, 999),
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
export { generateOffers };
