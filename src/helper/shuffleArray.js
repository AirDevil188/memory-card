export function shuffle(arr) {
  let temp;
  let lastIndex = arr.length - 1;

  while (lastIndex > 0) {
    const randomIndex = Math.floor(Math.random() * lastIndex);
    temp = arr[lastIndex];
    arr[lastIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
    lastIndex = lastIndex - 1;
  }
  return arr;
}
