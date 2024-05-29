import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../../components/typography/text.component";
import { SafeArea } from "../../components/utility/safe-area.component";
import { HomeNavigator } from "./home.navigator";
import { CartScreen } from "../../features/cart/screens/cart.screen";
import { ProfileNavigator } from "./profile.navigator";
import { DocumentNavigator } from "./document.navigator";
import { PeriodicServiceContextProvider } from "../../services/periodicservice/periodicservice.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { ProfileContextProvider } from "../../services/profile-details/profile.context";
import { AddressContextProvider } from "../../services/address/address.context";
import { AdminProfileScreen } from "../../features/admin/screens/admin-profile.screen";
import { AdminNavigator } from "./admin.navigator";
import { AdminScreen } from "../../features/admin/screens/home.screen";

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
  "ProfileViewScreen",
  "ManageProfileScreen",
  "AddUserScreen"
];

export const AdminHomeNavigator = () => {
  return (
    <ProfileContextProvider>
      <AddressContextProvider>
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
            component={AdminNavigator}
            options={({ route }) => ({
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
          <Tab.Screen name="Profile" component={AdminProfileScreen} />
        </Tab.Navigator>
      </AddressContextProvider>
    </ProfileContextProvider>
  );
};
