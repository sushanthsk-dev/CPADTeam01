import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { AdminScreen } from "../../features/admin/screens/home.screen";
import { ManageProfileScreen } from "../../features/admin/screens/manage-profile.screen";
import { AddUserScreen } from "../../features/admin/screens/add-user.screen";
import { ProfileViewScreen } from "../../features/admin/screens/profile-view.screen";
import { OrderListScreen } from "../../features/admin/screens/order-list.screen";
import { AgentListScreen } from "../../features/admin/screens/agent-list.screen";
import { OrderSummaryScreen } from "../../features/admin/screens/order-summary";
import { DropMechanicLocationScreen } from "../../features/mechanic/screens/drop-mechanic-location.screen";

const AdminStack = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerMode: false,
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    >
      <AdminStack.Screen name="AdminScreen" component={AdminScreen} />

      <AdminStack.Screen
        name="ManageProfileScreen"
        component={ManageProfileScreen}
      />
      <AdminStack.Screen name="AddUserScreen" component={AddUserScreen} />
      <AdminStack.Screen
        name="ProfileViewScreen"
        component={ProfileViewScreen}
      />
      <AdminStack.Screen name="OrderListScreen" component={OrderListScreen} />
      <AdminStack.Screen name="AgentListScreen" component={AgentListScreen} />

      <AdminStack.Screen
        name="OrderSummaryScreen"
        component={OrderSummaryScreen}
      />
    </AdminStack.Navigator>
  );
};
