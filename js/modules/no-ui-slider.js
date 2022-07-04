
const sliderElement = document.querySelector('.ad-form__slider');
const handlePriceInput = document.querySelector('#price');
noUiSlider.create(sliderElement, {
  range: {
    min: Number(handlePriceInput.min),
    max: Number(handlePriceInput.max),
  },
  start: Number(handlePriceInput.min),
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (!Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
sliderElement.noUiSlider.on('slide', () => {
  handlePriceInput.value = sliderElement.noUiSlider.get();
});
handlePriceInput.addEventListener('input', () => {
  sliderElement.noUiSlider.set(handlePriceInput.value);
});
const updateSliderOptions = function (min) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: Number(min),
      max: 100000,
    },
    step: 1
  });
  sliderElement.noUiSlider.set( min);
};
export {updateSliderOptions};
