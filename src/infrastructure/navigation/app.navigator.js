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
import { CartContextProvider } from "../../services/Cart/cart.context";
import { DateContextProvider } from "../../services/date-time/date.context";
import { TimeContextProvider } from "../../services/date-time/time.context";
import { AuthenticationContextProvider } from "../../services/authentication/authentication.context";

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
    tabBarLabelStyle: {
      display: "none"
    },
    tabBarIcon: ({ size, color }) => {
      return <MaterialCommunityIcons name={icon} color={color} size={size} />;
    },
  };
};
const hideScreenArray = [
  "PeriodicServiceScreen",
  "PeriodicServiceDetails",
  "CartScreenInside",
  "DocumentScreen",
  "AddDocumentScreen",
  "CheckoutScreen",
  "MyOrderScreen",
  "OrderSummary",
  "OrderSummaryScreen",
  "OrderScreen",
  "MyProfileScreen",
  "MyOrderScreen",
  "MapScreen",
  "CartScreenInside",
];

export const AppNavigator = () => {
  return (
    <PeriodicServiceContextProvider>
      <LocationContextProvider>
        <ProfileContextProvider>
          <AddressContextProvider>
            <CartContextProvider>
              <DateContextProvider>
                <TimeContextProvider>
                  <Tab.Navigator
                  labeled={false}
                    screenOptions={screenOptions}
                  >
                    <Tab.Screen
                      name="Home"          
                      component={HomeNavigator}
                      options={({ route }) => ({
                        headerShown: false,
                        tabBarVisible: ((routes) => {
                          const routeName =
                            getFocusedRouteNameFromRoute(routes) ?? "";
                          if (hideScreenArray.includes(routeName)) {
                            return false;
                          }
                          return true;
                        })(route),
                      })}
                    />
                    {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
                    <Tab.Screen
                      name="Profile"
                      options={({ route }) => ({
                        headerShown: false,
                        tabBarVisible: ((routes) => {
                          const routeName =
                            getFocusedRouteNameFromRoute(routes) ?? "";
                          if (hideScreenArray.includes(routeName)) {
                            return false;
                          }
                          return true;
                        })(route),
                      })}
                      component={ProfileNavigator}
                    />
                  </Tab.Navigator>
                </TimeContextProvider>
              </DateContextProvider>
            </CartContextProvider>
          </AddressContextProvider>
        </ProfileContextProvider>
      </LocationContextProvider>
    </PeriodicServiceContextProvider>
  );
};
