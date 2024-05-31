import React, { useState, createContext, useEffect } from "react";
import { DateContext } from "./date.context";
export const TimeContext = createContext();
export const TimeContextProvider = ({ children }) => {
  const { date } = React.useContext(DateContext);
  const [time, setTime] = useState([]);

  const add = (selectedTime) => {
    if (selectedTime !== time) {
      setTime(selectedTime);
    }
  };
  const remove = (selectedTime) => {
    if (selectedTime === time) {
      setTime([]);
    }

    if (!selectedTime) {
      setTime([]);
    }
  };
  useEffect(() => {
    setTime([]);
  }, [date]);

  return (
    <TimeContext.Provider value={{ time, addTime: add, removeTime: remove }}>
      {children}
    </TimeContext.Provider>
  );
};
