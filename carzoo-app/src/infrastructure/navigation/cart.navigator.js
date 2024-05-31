import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import styled from "styled-components/native";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/text.component";

const CartStack = createStackNavigator();

const ViewScreen = () => (
  <Spacer>
    <Text>Hello World</Text>
  </Spacer>
);

export const CartScreen = () => {
  return (
    <CartStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
    >
      <CartScreen.Screen name="CartScreen" component={ViewScreen} />
    </CartStack.Navigator>
  );
};
