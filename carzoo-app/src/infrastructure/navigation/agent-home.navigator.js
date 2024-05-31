import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { AgentOrderListScreen } from "../../features/agent/screens/home.screen";
import { AgentOrderSummaryScreen } from "../../features/agent/screens/order-summary";
import {
  BookingOrderContextProvider,
} from "../../services/order-list/booking-order.context";

const AgentStack = createStackNavigator();
export const AgentNavigator = () => {
  return (
    <BookingOrderContextProvider>
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
    </BookingOrderContextProvider>
  );
};
