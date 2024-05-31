import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CarContext = createContext();

export const CarContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const saveAddress = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@address", jsonValue);
    } catch (e) {
      console.log("Error while saving ", e);
    }
  };

  const loadAddress = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@address");
      if (jsonValue !== null) {
        setAddress(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log("Error while loading ", e);
    }
  };

  const add = (addrss) => {
    setIsLoading(true);
    setTimeout(() => {
      setAddress(addrss);
      setIsLoading(false);
    }, 500);
  };

  const remove = () => {
    setAddress(null);
  };

  useEffect(() => {
    setIsLoading(true);
    loadAddress();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    saveAddress(address);
  }, [address]);

  return (
    <AddressContext.Provider
      value={{
        address,
        addAddress: add,
        removeAddress: remove,
        isLoading: isLoading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
