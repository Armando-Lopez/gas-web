export const getTodayDate = () => {
  const today = new Date();

  return today;
};

export const dateDifferenceInDays = (
  date1: Date | string,
  date2: Date | string
) => {
  const valeDate1 = new Date(date1);
  const valeDate2 = new Date(date2);
  const difference = valeDate1.getTime() - valeDate2.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
};
