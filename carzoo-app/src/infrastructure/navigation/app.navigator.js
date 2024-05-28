import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../../components/typography/text.component";
import { SafeArea } from "../../components/utility/safe-area.component";
import { HomeNavigator } from "./home.navigator";
import { CartScreen } from "../../features/cart/screens/cart.screen";

const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Home: "home",
  Cart: "cart",
  Profile: "account",
};
const screenOptions = ({ route }) => {
  const icon = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => {
      return <MaterialCommunityIcons name={icon} color={color} size={size} />;
    },
  };
};
const hideScreenArray = [
  "PeriodicServiceScreen",
  "PeriodicServiceDetails",
  "CartScreenInside",
];
const ProfileScreen = () => (
  <SafeArea>
    <Text>Profile Screen Screen</Text>
  </SafeArea>
);

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: "#6200EE",
        inactiveTintColor: "#262626",
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarVisible: ((routes) => {
            const routeName = getFocusedRouteNameFromRoute(routes) ?? "";
             if (hideScreenArray.includes(routeName)) {
              return false;
            }
            return true;
          })(route),
        })}
      />
      {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
