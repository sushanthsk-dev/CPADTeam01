import React, { useState, useEffect, createContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profileDetails, setProfileDetails] = useState([]);
  const rawData = {
    name: "Virat",
    email: "sushanthsmbanger318@gmail.com",
    phoneno: "9876543210",
  };
  const [isLoading, setIsLoading] = useState(false);
  const save = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@profile", jsonValue);
    } catch (e) {
      console.log("Error while saving ", e);
    }
  };

  const load = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@profile");
      if (jsonValue !== null) {
        setProfileDetails(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log("Error while loading ", e);
    }
  };

  const add = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setProfileDetails(data);
      setIsLoading(false);
    }, 1500);
  };

  const remove = () => {
    setProfileDetails(null);
  };

  useEffect(() => {
    setIsLoading(true);
    load();
    setIsLoading(false);
  }, []);
  return (
    <ProfileContext.Provider
      value={{
        saveProfileDetails: add,
        profileDetails: profileDetails,
        isProfileLoading: isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
