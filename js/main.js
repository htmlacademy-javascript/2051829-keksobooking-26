import { activateFormValidation } from './modules/add-form-validation.js';
import { hideForms, showForms } from './modules/form.js';
import { activateMap } from './modules/map.js';
import { activateSlider } from './modules/no-ui-slider.js';
import { getOffers } from './modules/fetch-api.js';

const numberSimilarOffers = 10;

hideForms();

const getData = (data) =>{
  activateMap(showForms, data.slice(0,numberSimilarOffers));
};

getOffers(getData);

activateSlider();
activateFormValidation();
