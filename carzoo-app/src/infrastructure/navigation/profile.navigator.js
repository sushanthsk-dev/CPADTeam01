import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { ProfileScreen } from "../../features/profile/screens/profile.screens";
import { MyProfileScreen } from "../../features/profile/screens/my-profile.screens";
import { MyOrderScreen } from "../../features/profile/screens/my-order.screen";
import { OrderSummary } from "../../features/profile/screens/order-summary.screen";
import { MyCarScreen } from "../../features/profile/screens/my-car.screen";
import { AddressScreen } from "../../features/cart/screens/address.screen";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{headerMode: false, ...TransitionPresets.SlideFromRightIOS }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <ProfileStack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <ProfileStack.Screen name="MyAddressScreen" component={AddressScreen} />
      <ProfileStack.Screen name="OrderSummary" component={OrderSummary} />
      <ProfileStack.Screen name="MyCarScreen" component={MyCarScreen} />
    </ProfileStack.Navigator>
  );
};
