import { showAlert, unblockSubmitButton, onSuccess, onError } from './utils.js';

const GET_OFFERS_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_OFFER_URL = 'https://26.javascript.pages.academy/keksobooking';

const fetchOffers = (onLoad) => {
  fetch(GET_OFFERS_URL)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((response) => response.json())
    .then(onLoad)
    .catch ((error) => showAlert(`Ошибка загрузки данных, попробуйте обновить страницу. ${error}`));
};

const sendData = (body) => {
  fetch(
    SEND_OFFER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        unblockSubmitButton();
        document.querySelector('.ad-form__reset').click();
      } else {
        onError();
        unblockSubmitButton();
      }
    })
    .catch(() => {
      showAlert(' Ошибка подключения. Попробуйте ещё раз');
    });
};
export { fetchOffers, sendData };
