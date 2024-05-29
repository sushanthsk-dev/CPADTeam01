import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { OrderCard } from "../components/order-card.component";

const OrderContainer = styled.View`
  margin-top: 56px;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const MyOrderScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title="My Order" />
      <OrderContainer>
        <TouchableOpacity onPress={() => navigation.navigate("OrderSummary")}>
          <OrderCard />
        </TouchableOpacity>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </OrderContainer>
    </SafeArea>
  );
};
