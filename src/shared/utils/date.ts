export const getTodayDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return {
    date: `${dd}/${mm}/${yyyy}`,
    timestamp: new Date(`${yyyy}-${mm}-${dd}`),
  };
};

export const datePLusDays = (
  date?: Date | string | number,
  days: number = 0
) => {
  const newDate = new Date(date || new Date());
  newDate.setDate(newDate.getDate() + days);
  const dd = String(newDate.getDate()).padStart(2, "0");
  const mm = String(newDate.getMonth() + 1).padStart(2, "0");
  const yyyy = newDate.getFullYear();
  return {
    date: `${dd}/${mm}/${yyyy}`,
    timestamp: new Date(`${yyyy}-${mm}-${dd}`),
  };
};

export const timeStampToDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const dateDifferenceInDays = (
  date1: Date | string,
  date2: Date | string
) => {
  const valeDate1 =
    date1 instanceof Date
      ? date1
      : new Date(date1.toString().split("/").reverse().join("-"));
  const valeDate2 =
    date2 instanceof Date
      ? date2
      : new Date(date2.toString().split("/").reverse().join("-"));
  const difference = Math.abs(valeDate1.getTime() - valeDate2.getTime());
  return Math.ceil(difference / (1000 * 3600 * 24));
};
