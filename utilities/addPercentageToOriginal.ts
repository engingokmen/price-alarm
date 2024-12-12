export const addPercentageToOriginal = (number: number, percentage: number) => {
  const add = (number * percentage) / 100;
  return number + add;
};
