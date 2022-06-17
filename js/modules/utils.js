function getRandomInteger(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomFloat(from, to, digits = 5) {
  const lower = Math.min(Math.abs(from), Math.abs(to));
  const upper = Math.max(Math.abs(from), Math.abs(to));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}
function getRandomArrayElements(arr) {
  const size = getRandomInteger(1, arr.length);
  const result = [];
  while (result.length < size) {
    const el = arr[getRandomInteger(0, size - 1)];
    if (!result.includes(el)) {
      result.push(el);
    }
  }
  return result;
}
const getValFromObjByStrKey = function (objWithKeys, str) {
  if (Object.getOwnPropertyDescriptor(objWithKeys, str)) {
    str = objWithKeys[str];
    return str;
  }
};

export {getRandomInteger, getRandomFloat, getRandomArrayElements, getValFromObjByStrKey};
