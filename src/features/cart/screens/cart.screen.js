import React from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { CommonButton } from "../components/cart.styles";
import { Header } from "../../../components/header/header.component";
import { CartCard } from "../components/cart.component";
import { CartContext } from "../../../services/Cart/cart.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";

const CartContainer = styled.View`
  margin-top: ${(props) => props.theme.space[2]};
  width: 100%;
  height: 100%;
`;

const CheckoutButton = styled(CommonButton)`
  position: absolute;
  bottom: 10px;
  margin: ${(props) => props.theme.space[2]};
  width: 96%;
`;

export const CartScreen = ({ route, navigation }) => {
  const { cart } = React.useContext(CartContext);
  let toLeftBoolean = false;
  const { toLeft, servicePlan } = route.params;
  toLeftBoolean = toLeft === true ? true : false;

  return (
    <SafeArea>
      <Header title="Cart" toLeft={toLeftBoolean} navigation={navigation} />
      {!!cart.id && (
        <>
          <CartContainer>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PeriodicServiceDetails", {
                  servicePlan: servicePlan,
                });
              }}
            >
              <CartCard />
            </TouchableOpacity>
          </CartContainer>
          <CheckoutButton onPress={() => null}>Go to Checkout</CheckoutButton>
        </>
      )}
      {!cart.id && (
        <Spacer>
          <Text>Cart is Empty</Text>
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Text>Click here to go Home</Text>
          </TouchableOpacity>
        </Spacer>
      )}
    </SafeArea>
  );
};
