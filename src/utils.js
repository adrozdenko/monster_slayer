export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function doThat(number, divider) {
  while (number % divider !== 0) {
    number++;
  }
  return number;
}
