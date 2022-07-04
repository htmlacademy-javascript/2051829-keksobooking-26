const parentElementsForHide = document.querySelectorAll('.ad-form,.map__filters');
const childElementsForHide = document.querySelectorAll('fieldset,select');
const hideForms = function () {
  parentElementsForHide.forEach((element) =>
    element.classList.add('ad-form--disabled')
  );
  childElementsForHide.forEach((element) =>
    element.setAttribute('disabled', true));
};
const showForms = function () {
  parentElementsForHide.forEach((element) =>
    element.classList.remove('ad-form--disabled')
  );
  childElementsForHide.forEach((element) =>
    element.removeAttribute('disabled'));
};
export { hideForms, showForms};
