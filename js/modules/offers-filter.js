const houseTypeSelect = document.querySelector('#housing-type');
const priseSelect = document.querySelector('#housing-price');
const roomsSelect = document.querySelector('#housing-rooms');
const guestsSelect = document.querySelector('#housing-guests');

function typesFilter(offerData) {
  return offerData.offer.type === houseTypeSelect.value || houseTypeSelect.value === 'any';
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
  const checkFeatures = document.querySelector('#housing-features').querySelectorAll('input:checked');
  if (checkFeatures.length && offerData.offer.features) {
    return Array.from(checkFeatures).every((checkFeatures) => offerData.offer.features.includes(checkFeatures.value));
  } else {
    return checkFeatures.length === 0;
  }
};

const getFiltered = (filteredData) => {

}
const createOffersFilter = (offerData) => {
  const mainFilter = () => {
    let filteredData = offerData
      .filter(typesFilter)
      .filter(pricesFilter)
      .filter(roomsFilter)
      .filter(guestsFilter)
      .filter(verifyFeaturesHousing)
      .slice(0, 10);
    getFiltered(filteredData);
    console.log('filteredData', filteredData);
  };


  document.querySelector('.map__filters').addEventListener('change', mainFilter);
};
console.log(getFiltered)
export { createOffersFilter, getFiltered };
