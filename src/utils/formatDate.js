export function formatDate(date) {
  if (!date) return null;

  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}
