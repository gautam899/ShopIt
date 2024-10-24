/* eslint-disable no-unused-vars */
import React from "react";

const FormatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthsName[date.getMonth()];
  const year = date.getFullYear();
  const daySuffix = (day) => {
    if (day > 3 && day < 21) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${day}${daySuffix(day)} ${month} ${year}`;
};

export default FormatDate;
