import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { MechanicAddressScreen } from "../../features/mechanic/screens/address.screen";
import { DropMechanicLocationScreen } from "../../features/mechanic/screens/drop-mechanic-location.screen";
import { MechanicProfileScreen } from "../../features/mechanic/screens/profile.screen";
import { ChangePasswordScreen } from "../../features/account/screens/changepassword.screen";

const MechanicStack = createStackNavigator();
export const MechanicNavigator = () => {
  return (
    <MechanicStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ScaleFromCenterAndroid }}
    >
      <MechanicStack.Screen
        name="DropMechanicLocationScreen"
        component={DropMechanicLocationScreen}
      />
      <MechanicStack.Screen
        name="MechanicProfileScreen"
        component={MechanicProfileScreen}
      />
      <MechanicStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </MechanicStack.Navigator>
  );
};
