function getRandomCeilInclusive(min, max) {
  let temp = Math.random() * (max - min + 1) + min;
  if (isNaN(min)
    || isNaN(max)
    || !Number.isInteger(min)
    || !Number.isInteger(max)
    || min === ''
    || max === ''
    || max < min
  ) {
    return 'Не корректные входные значения';
  }
  else if (max === min) {
    return min;
  }
  else if (min >= 0 && max >= min) {
    temp = Math.random() * (max - min + 1) + min;
    return Math.floor(temp);
  }
  return console.log('Проверьте корректность входного диапазона');
}
getRandomCeilInclusive(1, 3)

function getRandomFloatInclusive(min, max, coma) {
  let temp = Math.random() * (max - min + Math.pow(10, -coma)) + min;
  if (!Number.isInteger(coma)
    || coma > 16
    || isNaN(min)
    || isNaN(max)
    || isNaN(coma)
    || min === ''
    || max === ''
    || coma === ''
    || max < min
    || coma < 0
  ) {
    return 'Не корректные входные значения';
  }
  else if (min === 0 && max === min && coma === 0) {
    return 0;
  }
  else if (max === min && coma >= 0) {
    return min;
  }
  else if (min >= 0 && max >= min && coma === 0) {
    temp = Math.random() * (max - min + 1) + min;
    return Math.floor(temp);
  }
  else if (min >= 0 && max >= min && coma > 0) {
    return parseFloat(temp.toFixed(coma));
  }
  return console.log('Проверьте корректность входного диапазона');
}
getRandomFloatInclusive(1, 2, 3)