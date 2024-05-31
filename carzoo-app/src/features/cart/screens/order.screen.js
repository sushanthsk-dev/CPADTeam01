import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";

const ImageContainer = styled.Image`
  height: 200px;
  width: 200px;
`;

const OrderContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.theme.space[2]};
`;

const TrackButton = styled(Button)`
  width: 100%;
  margin-top: ${(props) => props.theme.space[4]};
`;
export const OrderScreen = ({ navigation, route }) => {
  const { orderId } = route.params;
  return (
    <SafeArea>
      <OrderContainer>
        <ImageContainer source={require("../../../../assets/order.png")} />
        <Spacer size="large">
          <Text variant="title">Your order placed successfully</Text>
        </Spacer>
        <TrackButton
          onPress={() =>
            navigation.navigate("OrderSummaryScreen", { orderId: orderId })
          }
          mode="contained"
        >
          Track
        </TrackButton>
        <Spacer size="large">
          <TouchableOpacity onPress={() => navigation.popToTop()}>
            <Text>Back to home</Text>
          </TouchableOpacity>
        </Spacer>
      </OrderContainer>
    </SafeArea>
  );
};
//348
