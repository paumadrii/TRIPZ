export const addCero = (number) => {
  let newNumber = number;

  if (number < 10) {
    newNumber = `0${number}`;
  }

  return newNumber;
};
