import { renderMarkers } from './map.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;
const houseTypeSelect = document.querySelector('#housing-type');
const priseSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');

const filterByHouseType = (type) => houseTypeSelect.value === type || houseTypeSelect.value === 'any';
const filterByPrice = (price) => {
  if (priseSelect.value === 'low') {
    return price < 10000;
  }
  if (priseSelect.value === 'middle') {
    return price > 10000 && price < 50000;
  }
  if (priseSelect.value === 'high') {
    return price > 50000;
  }
  return true;
};

const filterByRoomsCount = (roomsCount) => Number(roomsSelect.value) === roomsCount || roomsSelect.value === 'any';
const filterByGuestsCount = (guestsCount) => Number(guestsSelect.value) === guestsCount || guestsSelect.value === 'any';

const filterByFeatures = (features) => {
  const checkBoxFeatures = document.querySelector('#housing-features').querySelectorAll('input:checked');
  if (checkBoxFeatures.length && features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => features.includes(checkFeatures.value));
  } else {
    return checkBoxFeatures.length === 0;
  }
};

const filterOffer = (offers, rerenderMarkers) => {
  const filteredOffers = offers.filter(({ offer }) =>
    filterByHouseType(offer.type) &&
    filterByPrice(offer.price) &&
    filterByRoomsCount(offer.rooms) &&
    filterByGuestsCount(offer.guests) &&
    filterByFeatures(offer.features)
  );
  rerenderMarkers(filteredOffers.slice(0, 10));
};

const initFilters = (offers) => {
  document.querySelector('.map__filters').addEventListener('change',
    debounce(
      () => filterOffer(offers, renderMarkers),
      RERENDER_DELAY,
    )
  );
};

export { initFilters };
