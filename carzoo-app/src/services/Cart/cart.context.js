import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const saveCart = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cart", jsonValue);
    } catch (e) {
      console.log("Error while saving ", e);
    }
  };

  const loadCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cart");
      if (jsonValue !== null) {
        setCart(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log("Error while loading ", e);
    }
  };

  const add = (servicePlan) => {
    if (servicePlan.id !== cart.id) {
      setCart(servicePlan);
    }
  };
  const remove = (servicePlan) => {
    if (servicePlan.id === cart.id) {
      setCart([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, addCart: add, removeCart: remove }}>
      {children}
    </CartContext.Provider>
  );
};
