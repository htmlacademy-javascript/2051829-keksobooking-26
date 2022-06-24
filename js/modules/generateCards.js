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
  const featureCloneTemplate = document.querySelector('#card').content.querySelector('.popup__features').cloneNode(true);
  const featureList = featureCloneTemplate.querySelectorAll('.popup__feature');
  const makeFeatureFullCss = arr.map((item) => `popup__feature--${item}`);
  featureList.forEach((listItem) => {
    const cssModifier = listItem.classList[1];
    if (makeFeatureFullCss.includes(cssModifier)) {
      featuresFragmentElement.appendChild(listItem);
    }
  });
  return featuresFragmentElement;
};
function generateCards(generatedData) {
  generatedData.forEach((data) => {
    const card = mainCardTemplate.cloneNode(true);
    if (data.author.avatar) { card.querySelector('.popup__avatar').src = data.author.avatar; }
    else { card.querySelector('.popup__avatar').remove(); }
    if (data.offer.title) { card.querySelector('.popup__title').textContent = data.offer.title; }
    else { card.querySelector('.popup__title').remove(); }
    if (data.offer.address) { card.querySelector('.popup__text--address').textContent = data.offer.address; }
    else { card.querySelector('.popup__text--address').remove(); }
    if (data.offer.checkin && data.offer.checkout) { card.querySelector('.popup__text--time').textContent = `Заезд после:${data.offer.checkin}, выезд после ${data.offer.checkout}`; }
    else { card.querySelector('.popup__text--time').remove(); }
    if (data.offer.price) { card.querySelector('.js_price').textContent = data.offer.price; }
    else { card.querySelector('.js_price').remove(); }
    if (HOUSE_TYPE_MATCHES[data.offer.type]) { card.querySelector('.popup__type').textContent = HOUSE_TYPE_MATCHES[data.offer.type]; }
    else { card.querySelector('.popup__type').remove(); }
    if (data.offer.rooms && data.offer.guests) { card.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей.`; }
    else { card.querySelector('.popup__text--capacity').remove(); }
    if (data.offer.features) {
      card.querySelector('.popup__features').textContent = '';
      card.querySelector('.popup__features').appendChild(generateFeatures(data.offer.features));
    }
    else { card.querySelector('.popup__features').remove(); }
    if (data.offer.description) { card.querySelector('.popup__description').textContent = data.offer.description; }
    else { card.querySelector('.popup__description').remove(); }
    if (data.offer.photos) {
      card.querySelector('.popup__photos').textContent = '';
      card.querySelector('.popup__photos').appendChild(generatePhotoUrls(data.offer.photos));
    }
    else { card.querySelector('.popup__photos').remove();}
    fragment.appendChild(card);
    return generateCards;
  });
  canvas.appendChild(fragment);
}
export { generateCards };
