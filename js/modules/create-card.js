const HOUSE_TYPE_MATCHES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const generatePhotoUrls = (urlsArr) => {
  const photosFragmentElement = document.createDocumentFragment();
  urlsArr.forEach((item) => {
    const imgTemplate = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode(true);
    imgTemplate.src = item;
    photosFragmentElement.appendChild(imgTemplate);
  });
  return photosFragmentElement;
};
const generateFeatures = (arr) => {
  const featuresFragmentElement = document.createDocumentFragment();
  const featureCloneTemplateElement = document.querySelector('#card').content.querySelector('.popup__features').cloneNode(true);
  const featureListElement = featureCloneTemplateElement.querySelectorAll('.popup__feature');
  const makeFeatureFullCss = arr.map((item) => `popup__feature--${item}`);
  featureListElement.forEach((listItem) => {
    const cssModifier = listItem.classList[1];
    if (makeFeatureFullCss.includes(cssModifier)) {
      featuresFragmentElement.appendChild(listItem);
    }
  });
  return featuresFragmentElement;
};

const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');

const setElementValue = (data, element, attr) => {
  if (data) {
    element[attr] = data;
  } else {
    element.remove();
  }
};

const createCard = (generatedData) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  setElementValue(generatedData.author.avatar, cardElement.querySelector('.popup__avatar'), 'src');
  setElementValue(generatedData.offer.title, cardElement.querySelector('.popup__title'), 'textContent');
  setElementValue(generatedData.offer.address, cardElement.querySelector('.popup__text--address'), 'textContent');
  setElementValue(generatedData.offer.price, cardElement.querySelector('.js_price'), 'textContent');
  setElementValue(HOUSE_TYPE_MATCHES[generatedData.offer.type], cardElement.querySelector('.popup__type'), 'textContent');
  setElementValue(generatedData.offer.description, cardElement.querySelector('.popup__description'), 'textContent');
  if (generatedData.offer.checkin && generatedData.offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после:${generatedData.offer.checkin}, выезд после ${generatedData.offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }
  if (generatedData.offer.rooms && generatedData.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${generatedData.offer.rooms} комнаты для ${generatedData.offer.guests} гостей.`;
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }
  if (generatedData.offer.features) {
    cardElement.querySelector('.popup__features').textContent = '';
    cardElement.querySelector('.popup__features').appendChild(generateFeatures(generatedData.offer.features));
  }
  else { cardElement.querySelector('.popup__features').remove(); }
  if (generatedData.offer.photos) {
    cardElement.querySelector('.popup__photos').textContent = '';
    cardElement.querySelector('.popup__photos').appendChild(generatePhotoUrls(generatedData.offer.photos));
  }
  else { cardElement.querySelector('.popup__photos').remove(); }
  return cardElement;
};

export { createCard };
