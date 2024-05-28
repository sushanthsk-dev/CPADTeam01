import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";

export const Navigation = () => {
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
