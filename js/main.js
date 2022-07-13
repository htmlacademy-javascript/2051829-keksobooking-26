import { activateFormValidation } from './modules/add-form-validation.js';
import { hideForms, showForms } from './modules/form.js';
import { activateMap } from './modules/map.js';
import { activateSlider } from './modules/no-ui-slider.js';
import { getOffers } from './modules/fetch-api.js';
import { createOffersFilter, getFiltered } from './modules/offers-filter.js';

hideForms();

const getData = (data) => {

  createOffersFilter(data);

  // activateMap(showForms, data);


};

const filtered =(filteredData)=>{
  activateMap(showForms, filteredData);
}
console.log(getFiltered)
getOffers(getData);

activateSlider();
activateFormValidation();
