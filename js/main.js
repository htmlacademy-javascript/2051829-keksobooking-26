import {generateOffers} from './modules/offers-generator.js';
import {generateCards} from './modules/cards-generator.js';
generateCards(generateOffers(2));
