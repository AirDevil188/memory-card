export const randomNumbersArr = new Set([]);

export const generateRandomNumbers = (length) => {
  const randomNumber = Math.floor(Math.random() * 150 + 1);
  while (randomNumbersArr.size !== length) {
    if (!randomNumbersArr.has(randomNumber)) randomNumbersArr.add(randomNumber);
    else return generateRandomNumbers(length);
  }
};
