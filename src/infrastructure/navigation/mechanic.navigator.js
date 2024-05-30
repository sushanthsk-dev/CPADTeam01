import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { MechanicAddressScreen } from "../../features/mechanic/screens/address.screen";
import { DropMechanicLocationScreen } from "../../features/mechanic/screens/drop-mechanic-location.screen";
import { MechanicProfileScreen } from "../../features/mechanic/screens/profile.screen";
import { ChangePasswordScreen } from "../../features/account/screens/changepassword.screen";
import { AgentMechanicContextProvider } from "../../services/agent-mechanic/agent-mechanic.context";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const MechanicStack = createStackNavigator();
export const MechanicNavigator = () => {
  const { user } = React.useContext(AuthenticationContext);
  return (
    <AgentMechanicContextProvider>
      <MechanicStack.Navigator
        headerMode="none"
        screenOptions={{ ...TransitionPresets.ScaleFromCenterAndroid }}
      >
        {!user.location && (
          <MechanicStack.Screen
            name="DropMechanicLocationScreen"
            component={DropMechanicLocationScreen}
          />
        )}
        <MechanicStack.Screen
          name="MechanicProfileScreen"
          component={MechanicProfileScreen}
        />
        <MechanicStack.Screen
          name="ChangeMechanicLocationScreen"
          component={DropMechanicLocationScreen}
        />
        <MechanicStack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
        />
      </MechanicStack.Navigator>
    </AgentMechanicContextProvider>
  );
};
