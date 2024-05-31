import React, { useState, useEffect, createContext } from "react";
export const DateContext = createContext();

export const DateContextProvider = ({ children }) => {
  const [date, setDate] = useState([]);

  const add = (selectedDate) => {
    if (selectedDate.split(" ")[2] !== date.toString().split(" ")[2]) {
      setDate(selectedDate);
    }
  };
  const remove = (selectedDate) => {
    if (selectedDate !== null) {
      if (selectedDate.split(" ")[2] === date.toString().split(" ")[2]) {
        setDate([]);
      }
    } else {
      setDate([]);
    }
  };
  return (
    <DateContext.Provider value={{ date, addDate: add, removeDate: remove }}>
      {children}
    </DateContext.Provider>
  );
};
