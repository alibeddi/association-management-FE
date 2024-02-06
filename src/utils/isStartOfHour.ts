export const isStartOfHour = (value:Date | undefined) => {
  if (!value) return false; 
  const startDate = new Date(value);
  return startDate.getMinutes() === 0;
}