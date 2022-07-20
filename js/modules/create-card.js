const cardTemplateElement = document.querySelector('template[id="card"]').content.querySelector('.popup');

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
    const imgTemplate = document.querySelector('template[id="card"]').content.querySelector('.popup__photo').cloneNode(true);
    imgTemplate.src = item;
    photosFragmentElement.appendChild(imgTemplate);
  });
  return photosFragmentElement;
};
const generateFeatures = (arr) => {
  const featuresFragmentElement = document.createDocumentFragment();
  const featureCloneTemplateElement = document.querySelector('template[id="card"]').content.querySelector('.popup__features').cloneNode(true);
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

const setElementValue = (data, element, attr) => {
  if (data) {
    element[attr] = data;
  } else {
    element.remove();
  }
};

const createCard = (offer) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const featureCardElement = cardElement.querySelector('.popup__features');
  const photosCardElement = cardElement.querySelector('.popup__photos');
  setElementValue(offer.author.avatar, cardElement.querySelector('.popup__avatar'), 'src');
  setElementValue(offer.offer.title, cardElement.querySelector('.popup__title'), 'textContent');
  setElementValue(offer.offer.address, cardElement.querySelector('.popup__text--address'), 'textContent');
  setElementValue(offer.offer.price, cardElement.querySelector('.js_price'), 'textContent');
  setElementValue(HOUSE_TYPE_MATCHES[offer.offer.type], cardElement.querySelector('.popup__type'), 'textContent');
  setElementValue(offer.offer.description, cardElement.querySelector('.popup__description'), 'textContent');
  if (offer.offer.checkin && offer.offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после:${offer.offer.checkin}, выезд после ${offer.offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }
  if (offer.offer.rooms && offer.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей.`;
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }
  if (offer.offer.features) {
    featureCardElement.textContent = '';
    featureCardElement.appendChild(generateFeatures(offer.offer.features));
  } else {
    featureCardElement.remove();
  }
  if (offer.offer.photos) {
    photosCardElement.textContent = '';
    photosCardElement.appendChild(generatePhotoUrls(offer.offer.photos));
  } else {
    photosCardElement.remove();
  }
  return cardElement;
};

export { createCard };
