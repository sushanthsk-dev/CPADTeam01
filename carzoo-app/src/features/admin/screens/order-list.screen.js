import React, { useEffect, useState, useContext } from "react";
import { Image, TouchableOpacity, ScrollView } from "react-native";
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

const Tab = createMaterialTopTabNavigator();

const OrderContainer = styled.View`
  flex: 1;
`;

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
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

const Container = styled.View`
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ImageContainer = styled(Image)`
  margin-left: 20px;
  margin-bottom: 20px;
`;

const AssignButton = styled(Button)`
  z-index: 888;
  background: ${(props) => props.theme.colors.brand.primary};
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 24px;
`;

const AssignedText = styled(Text)`
  z-index: 888;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 24px;
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

const CardList = ({ serviceOrder }) => (
  <Card>
    <CardHead>
      <Title>
        <Text variant="title">{serviceOrder.carDetails.registrationNo}</Text>
        <Text variant="caption">{`ID: ${serviceOrder.orderId}`}</Text>
      </Title>
      <ID>
        <Text variant="light_text">{serviceOrder.servicePlan}</Text>
      </ID>
    </CardHead>
  </Card>
);

export const OrderListScreen = ({ navigation, name }) => {
  const {
    orderList = null,
    getBookingOrders,
    isLoading,
  } = useContext(BookingOrderContext);

  useEffect(() => {
    getBookingOrders();
  }, []);
  const OnGoingOrders = () => {
    return !isLoading ? (
      <>
        <CardContainer>
          {orderList.map(
            (serviceOrder) =>
              serviceOrder.agent === undefined && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OrderSummaryScreen", {
                      serviceOrderId: serviceOrder._id,
                    })
                  }
                  key={serviceOrder._id}
                >
                  <CardList
                    key={serviceOrder._id}
                    serviceOrder={serviceOrder}
                  />
                  <AssignButton
                    color={"#fff"}
                    onPress={() =>
                      navigation.navigate("AgentListScreen", {
                        orderId: serviceOrder._id,
                      })
                    }
                  >
                    Assign
                  </AssignButton>
                </TouchableOpacity>
              )
          )}
          {orderList.map(
            (serviceOrder) =>
              serviceOrder.agent !== undefined &&
              serviceOrder.orderStatus !== "Deliveried" && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OrderSummaryScreen", {
                      serviceOrderId: serviceOrder._id,
                    })
                  }
                  key={serviceOrder._id}
                >
                  <CardList
                    key={serviceOrder._id}
                    serviceOrder={serviceOrder}
                  />
                  <AssignedText>Assigned</AssignedText>
                </TouchableOpacity>
              )
          )}
          <NoOrderContainer text="No Service orders" />
        </CardContainer>
      </>
    ) : (
      <LoadingDiv />
    );
  };
  const CompletedOrders = () => {
    return !isLoading ? (
      orderList.length > 0 ? (
        <CardContainer>
          {orderList.map(
            (serviceOrder) =>
              serviceOrder.orderStatus === "Deliveried" && (
                <TouchableOpacity
                  key={serviceOrder._id}
                  onPress={() =>
                    navigation.navigate("OrderSummaryScreen", {
                      serviceOrderId: serviceOrder._id,
                    })
                  }
                >
                  <CardList serviceOrder={serviceOrder} />
                  <CompletedText variant="light_text">Completed</CompletedText>
                </TouchableOpacity>
              )
          )}
          <NoOrderContainer />
        </CardContainer>
      ) : (
        <Container>
          <Text variant="title">No Service Order</Text>
        </Container>
      )
    ) : (
      <LoadingDiv />
    );
  };

  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title="Manage Orders" />
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
