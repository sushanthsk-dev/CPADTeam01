export const convertTime = (time) => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join("");
};

export const getTime = (date) => {
  const selectedDate = new Date(date);
  const timeArray = [
    "9-10AM",
    "10-11AM",
    "11-12PM",  
    "12-1PM",
    "2-3PM",
    "3-4PM",
  ];
  const todayDate = new Date();
  let remainingTimeArray;
  if (todayDate.getDate() === selectedDate.getDate()) {
    if (todayDate.getHours() <= 8) {
      remainingTimeArray = timeArray.slice(0, timeArray.length);
    } else if (selectedDate.getHours() <= 9 && todayDate.getHours() > 8) {
      remainingTimeArray = timeArray.slice(1, timeArray.length);
    } else if (selectedDate.getHours() <= 10 && todayDate.getHours() > 9) {
      remainingTimeArray = timeArray.slice(2, timeArray.length);
    } else if (selectedDate.getHours() <= 11 && todayDate.getHours() > 10) {
      remainingTimeArray = timeArray.slice(3, timeArray.length);
    } else if (selectedDate.getHours() <= 12 && todayDate.getHours() > 11) {
      remainingTimeArray = timeArray.slice(4, timeArray.length);
    } else if (selectedDate.getHours() <= 13 && todayDate.getHours() > 12) {
      remainingTimeArray = timeArray.slice(4, timeArray.length);
    }
    return remainingTimeArray;
  }
  return timeArray;
};

// const DateText = styled.(Text)`
export const getDate = () => {
  let dateArray = [];
  const curr = new Date(); // get current date
  let i = curr.getHours() >= 13 ? 1 : 0;
  let n = curr.getHours() >= 13 ? 6 : 5;
  for (i; i < n; i++) {
    var next = new Date(curr.getTime());
    next.setDate(curr.getDate() + i);
    dateArray.push(next.toString());
  }

  return dateArray;
};
