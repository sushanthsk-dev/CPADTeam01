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
import { AddressScreen } from "../../features/cart/screens/address.screen";
import { OrderScreen } from "../../features/cart/screens/order.screen";
import { DocumentScreen } from "../../features/insurance-and-emission/screens/documents.screens";
import { DocumentNavigator } from "./document.navigator";
import { AddDocumentScreen } from "../../features/insurance-and-emission/screens/add-document.screen";
import  MapScreen  from "../../features/map/screens/map.screen";
import { MechanicScreen } from "../../features/mechanic/screens/mechanic.screen";
import { MyCarScreen } from "../../features/profile/screens/my-car.screen";
import { OrderSummary } from "../../features/profile/screens/order-summary.screen";
import { InsuranceDocumentContextProvider } from "../../services/documents/insurance-document.context";
import { EmissionDocumentContextProvider } from "../../services/documents/emission-document.context";

const HomeStack = createStackNavigator();
export const HomeNavigator = () => {
  return (
    <InsuranceDocumentContextProvider>
      <EmissionDocumentContextProvider>
        <HomeStack.Navigator
          screenOptions={{headerMode: false, ...TransitionPresets.ScaleFromCenterAndroid }}
        >
          <HomeStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            screenOptions={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
          />

          <HomeStack.Screen name="CarScreen" component={MyCarScreen} />
          <HomeStack.Screen
            name="PeriodicServiceScreen"
            component={PeriodicServiceScreen}
          />
          <HomeStack.Screen
            name="PeriodicServiceDetails"
            component={PeriodicServiceDetails}
          />
          <HomeStack.Screen name="CartScreenInside" component={CartScreen} />
          <HomeStack.Screen name="AddressScreen" component={AddressScreen} />
          <HomeStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <HomeStack.Screen name="OrderScreen" component={OrderScreen} />
          <HomeStack.Screen
            name="OrderSummaryScreen"
            component={OrderSummary}
          />
          <HomeStack.Screen name="MapScreen" component={MapScreen} />
          <HomeStack.Screen name="DocumentScreen" component={DocumentScreen} />
          <HomeStack.Screen
            name="AddDocumentScreen"
            component={AddDocumentScreen}
          />
        </HomeStack.Navigator>
      </EmissionDocumentContextProvider>
    </InsuranceDocumentContextProvider>
  );
};
