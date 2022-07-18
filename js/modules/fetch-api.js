import { setMapFiltersFormEnabled } from './form.js';

const GET_OFFERS_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_OFFER_URL = 'https://26.javascript.pages.academy/keksobookin';

const fetchOffers = (onLoad, onError) => {
  fetch(GET_OFFERS_URL)
    .then((response) => {
      if (response.ok) {
        setMapFiltersFormEnabled();
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then(onLoad)
    .catch((error) => onError(error));
};

const onSubmitFormButtonClick = (body, onSuccess, onError, onFetchError) => {
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
      }
      onError();
    })
    .catch(() => {
      onFetchError();
    });
};
export { fetchOffers, onSubmitFormButtonClick };
