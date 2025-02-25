export const todays_date = new Date();
export const average_pace = "13'11";
export const avergae_step_frequency = 102;

export const formatDate = (dateString: any) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);

  const day = date.getDate(); // Day of the month
  const weekDay = daysOfWeek[date.getDay()]; // Day of the week
  const month = months[date.getMonth()]; // Month name
  const year = date.getFullYear().toString().slice(-2); // Last two digits of the year

  return [day, weekDay, month, year];
};

// export const format_number = (num: number): string => {
//   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

export const format_number = (num: number | string | undefined): string => {
  // Handle undefined/null cases
  if (num === undefined || num === null) return "0";

  // Convert to number and handle NaN
  const numberValue = Number(num);
  if (isNaN(numberValue)) return "0";

  // Handle negative numbers
  const absoluteValue = Math.abs(numberValue);
  const sign = numberValue < 0 ? "-" : "";

  // Format with commas
  const formatted = absoluteValue
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + formatted;
};
