import { hideForms, showForms } from './show-hide-forms.js';
import { generateOffers } from './generate-offers.js';
import { generateCards } from './generate-cards.js';
hideForms();
const data = generateOffers(1);
const addressInputElement = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    showForms();
  })
  .setView({
    lat: 36.13787,
    lng: 140.05371,
  }, 9);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
const mainRedIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const blueIcon = L.icon({
  iconUrl: '../../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const markerRed = L.marker(
  {
    lat: 36.13787,
    lng: 140.05371,
  },
  {
    draggable: true,
    icon: mainRedIcon,
  },
);
markerRed.addTo(map);
markerRed.on('drag', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressInputElement.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
});
const markerGroup = L.layerGroup().addTo(map);
const createMarker = ((item) => {
  const lat = item.location.lat;
  const lng = item.location.lng;
  const markerBlue = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: blueIcon,
    },
  );
  markerBlue
    .addTo(markerGroup)
    .bindPopup(generateCards(item));
  return markerBlue;
});
data.forEach((item) => {
  createMarker(item);
});
// resetButton.addEventListener('click', () => {
//   mainPinMarker.setLatLng({
//     lat: 59.96831,
//     lng: 30.31748,
//   });
//   map.setView({
//     lat: 59.96831,
//     lng: 30.31748,
//   }, 16);
// });
// markerGroup.clearLayers();
