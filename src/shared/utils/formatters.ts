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
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
) => {
  const isValidDate = new Date(date).toString() !== "Invalid Date";
  if (!isValidDate) return date;
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("es-CO", options).format(
    new Date(year, month - 1, day)
  );
};
