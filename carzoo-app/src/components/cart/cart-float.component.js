import React, { useState, useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../services/Cart/cart.context";
import { Text } from "../typography/text.component";

const CartFloatContainer = styled.View`
  position: absolute;
  height: 48px;
  bottom: 10px;
  width: 96%;
  margin: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 3px;
  z-index: 888;
`;

const CartTextContainer = styled.View`
  color: #ffff;
  flex-direction: row;
  margin: auto 0;
  justify-content: space-between;
  align-items: center;
`;
const CartText = styled(Text)`
  color: #ffff;
`;
export const LinkCartText = styled(Text)`
  color: #fff;
`;

export const LinkCart = styled(TouchableOpacity)``;

export const CartFloat = ({ navigation }) => {
  const { cart } = useContext(CartContext);
  return (
    <CartFloatContainer>
      <CartTextContainer>
        <CartText variant="subTitle">{`${cart.title} added `}</CartText>
        <LinkCart
          onPress={() =>
            navigation.navigate("CartScreenInside", {
              toLeft: true,
              servicePlan: cart,
            })
          }
        >
          <LinkCartText>view cart</LinkCartText>
        </LinkCart>
      </CartTextContainer>
    </CartFloatContainer>
  );
};
