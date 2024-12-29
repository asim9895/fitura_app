export const convert_minutes_to_hour_minutes = (
  totalMinutes: number
): string => {
  // Calculate the hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  // Return the formatted string
  return `${hours} h ${minutes} mins`;
};
