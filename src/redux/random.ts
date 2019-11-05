const getRandomInt = (min: number, max: number): number => {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};

const getRandomPlayerName = (array): string => {
  const randomIndex = getRandomInt(0, array.length);
  const name = array[randomIndex];

  return name;
};

export { getRandomInt, getRandomPlayerName };
