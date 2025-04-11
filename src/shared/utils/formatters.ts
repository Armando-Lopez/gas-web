export const formatCurrency = (value: number | string) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  return formatter.format(Number(value));
};

export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions
) => {
  const isValidDate = new Date(date).toString() !== "Invalid Date";
  if (!isValidDate) return date;
  return new Intl.DateTimeFormat("es-CO", options).format(new Date(date));
};
