const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weeksDay = (date) => {
    return DAYS[new Date(date * 1000).getDay()];
  };
  export {weeksDay}