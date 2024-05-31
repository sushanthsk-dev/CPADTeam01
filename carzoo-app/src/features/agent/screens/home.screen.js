import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfileCard } from "../components/profile-card.component";
import { Text } from "../../../components/typography/text.component";
import { BookingOrderContext } from "../../../services/order-list/booking-order.context";
import { LoadingDiv } from "../../../components/loading/loading.component";
import { NoOrderContainer } from "../../../components/no-order/no-order.component";
import { NetworkContext } from "../../../services/internetConnectionCheck/internet-network.context";
import { NoInternetErrorScreen } from "../../gps-map-error/no-internet-connection";

const Tab = createMaterialTopTabNavigator();

const OrderContainer = styled.View`
  flex: 1;
`;

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 ${(props) => props.theme.space[3]};
  border-bottom-width: 0.5px;
  border-color: grey;
`;
const CardHead = styled.View`
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[2]};
  flex: 0.8;
`;

const ID = styled.View``;
const Title = styled.View`
  align-items: center;
  margin-right: ${(props) => props.theme.space[6]};
  padding-right: ${(props) => props.theme.space[2]};
  justify-content: space-between;
  flex-direction: row;
`;

const CardContainer = styled(ScrollView)`
  background-color: #fff;
`;

const Container = styled(View)`
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ImageContainer = styled.Image`
  margin-left: 20px;
  margin-bottom: 20px;
`;

const CompletedText = styled(Text)`
  color: #fff;
  padding: ${(props) => props.theme.space[2]};
  z-index: 0;
  background: ${(props) => props.theme.colors.brand.primary};
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 24px;
`;
const CardList = ({ serviceOrder, orderId, servicePlan }) => {
  return (
    <Card>
      <CardHead>
        <Title>
          <Text variant="title">{serviceOrder.registrationNo}</Text>
          <Text variant="caption">{`ID:${orderId}`}</Text>
        </Title>
        <ID>
          <Text variant="light_text">{servicePlan}</Text>
        </ID>
      </CardHead>
    </Card>
  );
};
export const AgentOrderListScreen = ({ navigation, name }) => {
  const { getAgentAssignedOrders, isLoading, agentAssignedOrderList } =
    React.useContext(BookingOrderContext);

  const context = React.useContext(NetworkContext);
  React.useEffect(() => {
    getAgentAssignedOrders();
  }, []);

  console.log("LOD", isLoading);
  const OnGoingOrders = () => {
    return !isLoading ? (
      <>
        <CardContainer>
          {agentAssignedOrderList !== undefined &&
            agentAssignedOrderList.map(
              (serviceOrder) =>
                serviceOrder.orderStatus !== "Deliveried" && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AgentOrderSummaryScreen", {
                        serviceOrderId: serviceOrder._id,
                      })
                    }
                    key={serviceOrder._id}
                  >
                    <CardList
                      key={serviceOrder._id}
                      serviceOrder={serviceOrder.carDetails}
                      orderId={serviceOrder.orderId}
                      servicePlan={serviceOrder.servicePlan}
                    />

                    <CompletedText variant="light_text">Assigned</CompletedText>
                  </TouchableOpacity>
                )
            )}
          {/* <NoOrderContainer  /> */}
        </CardContainer>
      </>
    ) : (
      <LoadingDiv />
    );
  };
  const CompletedOrders = () => {
    return !isLoading ? (
      agentAssignedOrderList.length > 0 && (
        <CardContainer>
          {agentAssignedOrderList.map(
            (serviceOrder) =>
              serviceOrder.orderStatus === "Deliveried" && (
                <TouchableOpacity
                  key={serviceOrder._id}
                  onPress={() =>
                    navigation.navigate("AgentOrderSummaryScreen", {
                      serviceOrderId: serviceOrder._id,
                    })
                  }
                >
                  <CardList
                    key={serviceOrder._id}
                    serviceOrder={serviceOrder.carDetails}
                    orderId={serviceOrder.orderId}
                    servicePlan={serviceOrder.servicePlan}
                  />
                  <CompletedText variant="light_text">Completed</CompletedText>
                </TouchableOpacity>
              )
          )}
        </CardContainer>
      )
    ) : (
      <LoadingDiv />
    );
  };

  return (
    <SafeArea>
      {context.isConnected && (
        <NoInternetErrorScreen show={true} navigation={navigation} />
      )}

      <Header title="Manage Orders" />
      <OrderContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="OnGoingOrders"
            options={({ route }) => ({
              headerShown: false,
              tabBarLabel: "Ongoing Orders",
            })}
            component={OnGoingOrders}
          />
          <Tab.Screen
            name="CompletedOrders"
            options={({ route }) => ({
              headerShown: false,
              tabBarLabel: "Completed Orders",
            })}
            component={CompletedOrders}
          />
        </Tab.Navigator>
      </OrderContainer>
    </SafeArea>
  );
};
