const toggleHideForms = function () {
  const parentElementsForHide = document.querySelectorAll('.ad-form,.map__filters');
  const childElementsForHide = document.querySelectorAll('fieldset,select');
  parentElementsForHide.forEach((element) =>
    element.classList.add('ad-form--disabled')
  );
  childElementsForHide.forEach((element) =>
    element.setAttribute('disabled', true));
};
export { toggleHideForms };
