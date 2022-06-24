import {generateOffers} from './modules/generateOffers.js';
import {generateCards} from './modules/generateCards.js';
import {toggleHideForms} from './modules/toggleHideForms.js';
toggleHideForms();
generateCards(generateOffers(2));
