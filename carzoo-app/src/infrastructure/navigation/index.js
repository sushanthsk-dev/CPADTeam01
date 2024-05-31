import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";
import { AdminHomeNavigator } from "./admin-home.navigator";
import { AgentHomeNavigator } from "./agent.navigator";
import { MechanicHomeNavigator } from "./mechanic-home.navigator";
import { MechanicNavigator } from "./mechanic.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
  const { isAuthenticated, user } = React.useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        !!user.role &&
        (user.role === "agent" ? (
          <AgentHomeNavigator />
        ) : user.role === "mechanic" ? (
          <MechanicNavigator />
        ) : user.role === "admin" ? (
          <AdminHomeNavigator />
        ) : (
          <AppNavigator />
        ))
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
