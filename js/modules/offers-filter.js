const houseTypeSelect = document.querySelector('#housing-type');
const priseSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');

function typesFilter(offerData) {
  document.querySelector('.map__filters').addEventListener('change', typesFilter);
  if (offerData.offer.type !== undefined) {
    return offerData.offer.type === houseTypeSelect.value || houseTypeSelect.value === 'any';
  }
}
function pricesFilter(offerData) {
  if (priseSelect.value === 'middle' && offerData.offer.price > 10000 && offerData.offer.price < 50000) {
    return true;
  }
  if (priseSelect.value === 'low' && offerData.offer.price < 10000) {
    return true;
  }
  if (priseSelect.value === 'high' && offerData.offer.price > 50000) {
    return true;
  }
  return priseSelect.value === 'any';
}

function roomsFilter(offerData) {
  return offerData.offer.rooms === Number(roomsSelect.value) || roomsSelect.value === 'any';
}

function guestsFilter(offerData) {
  if (offerData.offer.guests === 1 && Number(guestsSelect.value) === 1) {
    return true;
  }
  if (offerData.offer.guests === 2 && Number(guestsSelect.value) === 2) {
    return true;
  }
  if (offerData.offer.guests === 3 && Number(guestsSelect.value) === 3) {
    return true;
  }
  if (offerData.offer.guests === 0 && Number(guestsSelect.value) === 0) {
    return true;
  }
  return guestsSelect.value === 'any';
}

const verifyFeaturesHousing = (offerData) => {
  const checkBoxFeatures = document.querySelector('#housing-features').querySelectorAll('input:checked');
  if (checkBoxFeatures.length && offerData.offer.features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => offerData.offer.features.includes(checkFeatures.value));
  } else {
    return checkBoxFeatures.length === 0;
  }
};

const createOffersFilter = (offerData) => offerData
  .filter(typesFilter)
  .filter(pricesFilter)
  .filter(roomsFilter)
  .filter(guestsFilter)
  .filter(verifyFeaturesHousing)
  .slice(0, 10);
// const createOffersFilter = (offerData) => {
//   const mainFilter = () => {
//     let filteredData = offerData
//       .filter(typesFilter)
//       .filter(pricesFilter)
//       .filter(roomsFilter)
//       .filter(guestsFilter)
//       .filter(verifyFeaturesHousing)
//       .slice(0, 10);
//     getFiltered(filteredData);
//     console.log('filteredData', filteredData);
//   };

// };
const onFilterClick = () => {
  document.querySelector('.map__filters').addEventListener('change', createOffersFilter);
};
export { createOffersFilter, onFilterClick };
