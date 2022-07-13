import { activateFormValidation } from './modules/add-form-validation.js';
import { hideForms, showForms } from './modules/form.js';
import { activateMap } from './modules/map.js';
import { activateSlider } from './modules/no-ui-slider.js';
import { getOffers } from './modules/fetch-api.js';
import { createOffersFilter, onFilterClick } from './modules/offers-filter.js';

hideForms();

const getData = (data) => {

  createOffersFilter(data);
  activateMap(showForms, createOffersFilter(data));
  onFilterClick(()=>activateMap(showForms, createOffersFilter(data)));
  // activateMap(showForms, data);

};

// (const filtered =(filteredData)=>{
//   activateMap(showForms, filteredData);
// });

getOffers(getData);

activateSlider();
activateFormValidation();
