import React, { useState, useEffect, createContext } from "react";
export const DateContext = createContext();
export const DateContextProvider = ({ children }) => {
  const [date, setDate] = useState([]);
  const [dateMemory, setDateMeory] = useState();
  const saveDate = async (value) => {
    try {
      const jsonValue = await JSON.stringify(value);
      setDateMeory(jsonValue);
    } catch (e) {
      console.log("Error while saving ", e);
    }
  };

  const loadDate = async () => {
    try {
      const jsonValue = await dateMemory;
      setDateMeory(JSON.parse(jsonValue));
    } catch (e) {
      console.log("Error while loading ", e);
    }
  };

  const add = (selectedDate) => {
    if (selectedDate.id !== date.id) {
      setDate(selectedDate);
    }
  };
  const remove = (selectedDate) => {
    if (selectedDate.id === date.id) {
      setDate([]);
    }
  };

  useEffect(() => {
    loadDate();
  }, []);

  useEffect(() => {
    saveDate(date);
  }, [date]);
  return (
    <DateContext.Provider value={{ date, addDate: add, removeDate: remove }}>
      {children}
    </DateContext.Provider>
  );
};
