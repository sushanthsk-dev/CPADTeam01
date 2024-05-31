import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../infrastructure/theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { CartContext } from "../../services/Cart/cart.context";
import { Text } from "../typography/text.component";
import { PrimaryButton } from "../button/button.component";
const AddButton = styled(TouchableOpacity)`
  position: absolute;
  top: 90px;
  right: 0;
  z-index: 999;
`;

const CartText = styled(Text)`
  color: #fff;
  text-align: center;
`;

export const AddCart = ({ servicePlan, textComponent = false }) => {
  const { cart, addCart, removeCart } = useContext(CartContext);
  const isAdded = servicePlan.id === cart.id ? true : false;
  if (!textComponent) {
    return (
      <AddButton
        onPress={() =>
          !isAdded ? addCart(servicePlan) : removeCart(servicePlan)
        }
      >
        <AntDesign
          name={!isAdded ? "plussquare" : "minussquare"}
          size={36}
          color={colors.brand.primary}
        />
      </AddButton>
    );
  }

  return (
    <PrimaryButton
      onPress={() => {
        !isAdded ? addCart(servicePlan) : removeCart(servicePlan)
      }
      }
    >
      <CartText variant="subTitle">
        {!isAdded ? "Add to cart" : "Added to cart"}
      </CartText>
    </PrimaryButton>
  );
};
