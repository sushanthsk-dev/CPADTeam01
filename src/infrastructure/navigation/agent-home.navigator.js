import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { OrderSummaryScreen } from "../../features/admin/screens/order-summary";
import { AgentOrderListScreen } from "../../features/agent/screens/home.screen";
import { AgentOrderSummaryScreen } from "../../features/agent/screens/order-summary";

const AgentStack = createStackNavigator();
export const AgentNavigator = () => {
  return (
    <AgentStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ScaleFromCenterAndroid }}
    >
      <AgentStack.Screen
        name="OrderListScreen"
        component={AgentOrderListScreen}
      />
      <AgentStack.Screen
        name="AgentOrderSummaryScreen"
        component={AgentOrderSummaryScreen}
      />
    </AgentStack.Navigator>
  );
};
