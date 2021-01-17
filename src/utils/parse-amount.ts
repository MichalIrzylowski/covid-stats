const findEveryThirdAndFourth = /(?!^)(?=(\d{3})+(?=\.|$))/;

export const parseAmount = (num: number) => {
  const stringedNumber = String(num);
  if (stringedNumber.length < 3) return stringedNumber;

  return stringedNumber.replace(findEveryThirdAndFourth, " ");
};
