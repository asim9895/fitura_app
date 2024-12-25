export const todays_date = new Date().toISOString().split("T")[0];

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
