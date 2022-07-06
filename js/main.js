import { activateFormValidation } from './modules/add-form-validation.js';
import { generateOffers } from './modules/generate-offers.js';
import { hideForms, showForms } from './modules/form.js';
import {activateMap} from './modules/map.js';
import {activateSlider} from './modules/no-ui-slider.js';

hideForms();

const offers = generateOffers(10);

activateSlider();
activateFormValidation();
activateMap(showForms,offers);
