import React, { useContext } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { CartFloat } from "../../../components/cart/cart-float.component";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/Cart/cart.context";
import { PeriodicServiceContext } from "../../../services/periodicservice/periodicservice.context";
import { PeriodicServiceInfo } from "../components/periodic-service-info.component";
const PeriodicServiceContainer = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[5]};
`;
const ServiceImageContainer = styled.View`
  width: 100%;
  background-color: grey;
  height: 180px;
  margin-bottom: ${(props) => props.theme.space[1]};
`;
const CoverImage = styled.Image`
  width: 100%;
  height: 180px;
`;
const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  margin-top: 56px;
`;
export const PeriodicServiceScreen = ({ navigation }) => {
  const { periodicServicePlans } = useContext(PeriodicServiceContext);
  const { cart } = useContext(CartContext);
  return (
    <SafeArea>
      <Header navigation={navigation} toLeft={true} title="Periodic Service" />
      {!!cart.id && <CartFloat navigation={navigation} />}
      <ScrollViewContainer>
        <ServiceImageContainer>
          <CoverImage
            source={require("../../../../assets/carServiceCover.jpg")}
          />
        </ServiceImageContainer>
        <PeriodicServiceContainer>
          <Spacer position="bottom" size="medium">
            <Text variant="title">Periodic Service</Text>
          </Spacer>
          {periodicServicePlans.map((p, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("PeriodicServiceDetails", {
                    servicePlan: p,
                  })
                }
              >
                <PeriodicServiceInfo periodicService={p} />
              </TouchableOpacity>
            );
          })}
        </PeriodicServiceContainer>
      </ScrollViewContainer>
    </SafeArea>
  );
};
