import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ProfileContextProvider } from "../../services/profile-details/profile.context";
import { AddressContextProvider } from "../../services/address/address.context";
import { AgentProfileScreen } from "../../features/agent/screens/profile.screen";
import { AgentNavigator } from "./agent-home.navigator";
import { MechanicNavigator } from "./mechanic.navigator";

const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Home: "home",
  Cart: "cart",
  Profile: "account",
};
const screenOptions = ({ route }) => {
  const icon = TAB_ICON[route.name];
  return {
    activeTintColor: "#6200EE",
    inactiveTintColor: "#262626",
    showLabel: false,
    tabBarIcon: ({ size, color }) => {
      return <MaterialCommunityIcons name={icon} color={color} size={size} />;
    },
  };
};
const hideScreenArray = ["ProfileViewScreen", "ManageProfileScreen"];

export const MechanicHomeNavigator = () => {
  return (
    <ProfileContextProvider>
      <AddressContextProvider>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="Home"
            component={MechanicNavigator}
            options={({ route }) => ({
              headerShown: false,
              tabBarVisible: ((routes) => {
                const routeName = getFocusedRouteNameFromRoute(routes) ?? "";
                console.log(routeName);
                if (hideScreenArray.includes(routeName)) {
                  return false;
                }
                return true;
              })(route),
            })}
          />
        </Tab.Navigator>
      </AddressContextProvider>
    </ProfileContextProvider>
  );
};
