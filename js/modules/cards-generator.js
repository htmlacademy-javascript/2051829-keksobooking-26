const HOUSE_TYPE_MATCHES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};
const canvas = document.querySelector('#map-canvas');
const mainCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const fragment = document.createDocumentFragment();
const photosFragment = document.createDocumentFragment();
const setPhotoUrls = (urlsArr) => {
  urlsArr.forEach((item) => {
    const imgTemplate = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode(true);
    imgTemplate.src = item;
    photosFragment.appendChild(imgTemplate);
    return photosFragment;
  });
};
const featuresFragment = document.createDocumentFragment();
const getFeatures = (arr) => {
  const featureCloneTemplate = document.querySelector('#card').content.querySelector('.popup__features').cloneNode(true);
  const featureList = featureCloneTemplate.querySelectorAll('.popup__feature');
  const makeFeatureFullCss = arr.map((item) => `popup__feature--${item}`);
  featureList.forEach((listItem) => {
    const cssModifier = listItem.classList[1];
    if (makeFeatureFullCss.includes(cssModifier)) {
      featuresFragment.appendChild(listItem);
    }
  });
};
function generateCards(generatedData) {
  generatedData.forEach((data) => {
    const card = mainCardTemplate.cloneNode(true);
    setPhotoUrls(data.offer.photos);
    getFeatures(data.offer.features);
    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--time').textContent = `Заезд после:${data.offer.checkin}, выезд после ${data.offer.checkout}`;
    card.querySelector('.popup__text--price').innerHTML = `${data.offer.price} <span>₽/ночь</span>`;
    card.querySelector('.popup__type').textContent = HOUSE_TYPE_MATCHES[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей.`;
    card.querySelector('.popup__features').innerHTML = '';
    card.querySelector('.popup__features').appendChild(featuresFragment);
    if (data.offer.description !== '') {
      card.querySelector('.popup__description').textContent = data.offer.description;
    } else {
      card.querySelector('.popup__description').classList.add('hidden');
    }
    card.querySelector('.popup__photos').innerHTML = '';
    card.querySelector('.popup__photos').appendChild(photosFragment);
    fragment.appendChild(card);
    return generateCards;
  });
  canvas.appendChild(fragment);
}
export { generateCards };
