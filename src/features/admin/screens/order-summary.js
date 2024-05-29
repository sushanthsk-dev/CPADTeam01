import React from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { PriceText } from "../../../components/typography/price-text.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AddressContext } from "../../../services/address/address.context";
import { AddressCard } from "../../cart/components/address-card.component";
import { AgentCard } from "../../profile/components/agent-card.component";
import { ServiceStatus } from "../../profile/components/service-status.component";

const OrderContainer = styled(ScrollView)`
  margin: 0 ${(props) => props.theme.space[2]};
  margin-top: 70px;
`;

const OrderCard = styled.View`
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border-radius: 5px;
`;

const Section = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[1]};
`;

const SpacerView = styled.View`
  margin: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const ServiceStatusContainer = styled.View`
  margin: ${(props) => props.theme.space[2]};
`;
const ServiceAgentDetails = styled.View`
  margin: ${(props) => props.theme.space[1]};
`;
export const OrderSummaryScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title="Order Summary" />
      <OrderContainer>
        <OrderCard>
          <Section>
            <Text variant="title">Basic Service</Text>
            <Text variant="caption">ID : CA15964</Text>
          </Section>
          <Spacer position="left" size="medium">
            <PriceText price={2099} />
          </Spacer>
          <Spacer size="large">
            <SpacerView>
              <Text variant="label">Car model : </Text>
              <Text variant="subHead">Hyundai Creta</Text>
            </SpacerView>
            <SpacerView>
              <Text variant="label">Reg no : </Text>
              <Text variant="subHead">KA19 HA-2027</Text>
            </SpacerView>
          </Spacer>
        </OrderCard>
        <Spacer>
          <Text variant="checkoutTitle">Customer's Details</Text>
          <AddressCard edit={false} />
        </Spacer>
        <ServiceStatusContainer>
          <Text variant="subHead">Service Status</Text>
          <ServiceStatus />
        </ServiceStatusContainer>

        <ServiceAgentDetails>
          <Text variant="subHead">Assigned to</Text>
          <AgentCard />
        </ServiceAgentDetails>
      </OrderContainer>
    </SafeArea>
  );
};
