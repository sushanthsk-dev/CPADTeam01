import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { CartContext } from "../../../services/Cart/cart.context";

const CartDiv = styled.View`
  background-color: ${(props) => props.theme.colors.brand.secondary};
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
`;
const PlanImage = styled(Image)`
  width: 60px;
  height: 60px;
`;

const CartText = styled.View`
  margin-left: ${(props) => props.theme.space[2]};
`;

const PriceView = styled.View`
  margin-top: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center;
`;

const CartData = styled.View`
  flex-direction: row;
  flex: 0.9;
`;

const SpacerView = styled(Spacer)`
  justify-content: center;
  flex-direction: row;
`;

const PriceLabel = styled.View`
  margin-bottom: 1.9px;
`;
export const CartCard = () => {
  const { cart, removeCart } = React.useContext(CartContext);
  const { title = "Basic Service", price = 2099, imageCover = "" } = cart;
  return (
    <CartDiv style={styles.Card}>
      <CartData>
        <PlanImage source={require("../../../../assets/icon.png")} />
        <CartText>
          <Text variant="title">{title}</Text>
          <PriceView>
            <PriceLabel>
              <Text>Price : </Text>
            </PriceLabel>
            <SpacerView position="left">
              <Text variant="subTitle">
                <FontAwesome name="rupee" size={14} color="black" />
                {` ${price}/-`}
              </Text>
            </SpacerView>
          </PriceView>
        </CartText>
      </CartData>
      <TouchableOpacity onPress={() => removeCart(cart)}>
        <Entypo name="cross" size={24} color="#262626" />
      </TouchableOpacity>
    </CartDiv>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
});
