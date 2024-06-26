export function getFormattedDate(dateToFormat: string) {
  const date = new Date(dateToFormat);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const result = `${hours}:${minutes} ${day}/${month}/${year}`;

  return result;
}
