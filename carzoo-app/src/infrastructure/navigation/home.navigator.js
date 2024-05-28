import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { PeriodicServiceScreen } from "../../features/periodic-service/screens/periodic-service.screen";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { PeriodicServiceDetails } from "../../features/periodic-service/screens/periodic-service-details.screen";
import { CartScreen } from "../../features/cart/screens/cart.screen";
import { CheckoutScreen } from "../../features/cart/screens/checkout.screen";

const HomeStack = createStackNavigator();
export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
    >
      <HomeStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />

      <HomeStack.Screen
        name="PeriodicServiceScreen"
        component={PeriodicServiceScreen}
      />
      <HomeStack.Screen
        name="PeriodicServiceDetails"
        component={PeriodicServiceDetails}
      />
      <HomeStack.Screen name="CartScreenInside" component={CartScreen} />
    </HomeStack.Navigator>
  );
};
