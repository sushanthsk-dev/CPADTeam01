import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import axios from "axios";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { PriceText } from "../../../components/typography/price-text.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AgentCard } from "../components/agent-card.component";
import { ServiceStatus } from "../components/service-status.component";
import { IPADDRESS } from "../../../utils/env";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AddressCard,
  PickupDateTimeCard,
} from "../../cart/components/address-card.component";

const OrderContainer = styled(ScrollView)`
  margin: 0 ${(props) => props.theme.space[2]};
  margin-top: 60px;
  padding-top: 10px;
`;

const OrderCard = styled.View`
  margin: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[2]};
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
  margin-bottom: 20px;
`;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const OrderSummary = ({ navigation, route }) => {
  const { headerToken } = React.useContext(AuthenticationContext);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { orderId = "610f85f8dde17d26fcaa7432" } = route.params;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "GET",
          headers: { Authorization: `Bearer ${headerToken}` },
          url: `${IPADDRESS}/api/v1/booking/user/${orderId}`,
        });

        if (res.data.status === "success") {
          console.log(res.data.data.doc);
          setIsLoading(false);
          setOrder(res.data.data.doc);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e.response.data);
        setError(e.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
    console.log(order);
  }, []);
  return (
    <SafeArea>
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : order !== null ? (
        <>
          <Header toLeft={true} navigation={navigation} title="Order Summary" />
          <OrderContainer showsVerticalScrollIndicator={false}>
            <OrderCard>
              <Section>
                <Text variant="title">{order.servicePlan}</Text>
                <Text variant="caption">{`ID : ${order.orderId}`}</Text>
              </Section>
              <Spacer position="left" size="medium">
                <PriceText price={order.price} />
              </Spacer>
              <Spacer size="large">
                <SpacerView>
                  <Text variant="label">Car model : </Text>
                  <Text variant="subHead">{order.carDetails.carModel}</Text>
                </SpacerView>
                <SpacerView>
                  <Text variant="label">Reg no : </Text>
                  <Text variant="subHead">
                    {order.carDetails.registrationNo}
                  </Text>
                </SpacerView>
              </Spacer>
            </OrderCard>
            <Spacer position="top" size="medium" />
            <Spacer position="left" size="medium">
              <Text variant="label">{`Service Ordered on ${new Date(
                order.createdAt
              ).toDateString()}`}</Text>
            </Spacer>
            <Spacer position="top" size="large">
              <Spacer position="left" size="medium">
                <Text variant="subHead">Pickup Date and time</Text>
              </Spacer>
              <PickupDateTimeCard pickupDateTime={order.pickupDateTime} />
            </Spacer>
            <Spacer>
              <Spacer position="left" size="medium">
                <Text variant="subHead">Pickup Address</Text>
              </Spacer>
              <Spacer position="bottom" size="medium" />
              <AddressCard
                edit={false}
                address={{
                  ...order.user.address,
                  phoneno: order.user.phoneno,
                  name: order.user.name,
                }}
              />
            </Spacer>
            <ServiceStatusContainer>
              <Text variant="subHead">Service Status</Text>
              <ServiceStatus orderStatus={order.orderStatus} />
            </ServiceStatusContainer>
            {order.deliveriedDate && (
              <>
                <Spacer position="top" size="large" />
                <Spacer position="left" size="medium">
                  <Text variant="label">{`Car deliveried on ${new Date(
                    order.deliveriedDate
                  ).toDateString()}`}</Text>
                </Spacer>
              </>
            )}
            {!!order.agent && (
              <ServiceAgentDetails>
                <Text variant="subHead">Assigned to</Text>
                <AgentCard agent={order.agent} />
              </ServiceAgentDetails>
            )}
          </OrderContainer>
        </>
      ) : null}
    </SafeArea>
  );
};
