import { showAlert, unblockSubmitButton, onSuccess, onError} from './utils.js';

const getOffers = (getData) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .then((response) => response.json())
    .then((data) => {
      getData(data);
    })
    .catch((error) => showAlert(`Ошибка загрузки данных, попробуйте обновить страницу. ${error}`));
};
const sendData = (body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
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
export { getOffers, sendData };
