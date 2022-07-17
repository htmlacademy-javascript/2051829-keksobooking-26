import { activateFormValidation } from './modules/add-form-validation.js';
import { hideForms, showForms } from './modules/form.js';
import { activateMap } from './modules/map.js';
import { activateSlider } from './modules/no-ui-slider.js';
import { fetchOffers } from './modules/fetch-api.js';
import { initFilters } from './modules/offers-filter.js';

hideForms();

fetchOffers((offers) => {
  activateMap(showForms, offers);
  initFilters(offers);
});

activateSlider();
activateFormValidation();
