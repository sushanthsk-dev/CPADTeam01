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

const Tab = createMaterialTopTabNavigator();

const OrderContainer = styled.View`
  margin-top: 70px;
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

const AssignText = styled(Text)`
  color: #fff;
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

const CardList = () => (
  <Card>
    <CardHead>
      <Title>
        <Text variant="title">KA19HA2021</Text>
        <Text variant="caption">ID:235466</Text>
      </Title>
      <ID>
        <Text variant="light_text">Basic Service</Text>
      </ID>
    </CardHead>
  </Card>
);

export const AgentOrderListScreen = ({ navigation, name }) => {
  const onGoingOrders = () => {
    return (
      <>
        <CardContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AgentOrderSummaryScreen", { name: name })
            }
          >
            <CardList />
          </TouchableOpacity>
          <CompletedText variant="light_text">Assigned</CompletedText>
        </CardContainer>
      </>
    );
  };
  const completedOrders = () => {
    return (
      <CardContainer>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("OrderSummaryScreen", { name: name })
          }
        >
          <CardList />
        </TouchableOpacity>
        <CompletedText variant="light_text">Completed</CompletedText>
      </CardContainer>
    );
  };

  return (
    <SafeArea>
      <Header title="Manage Orders" />
      <OrderContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="OngoingOrders"
            options={({ route }) => ({
              tabBarLabel: "Ongoing Orders",
            })}
            component={onGoingOrders}
          />
          <Tab.Screen
            name="CompletedOrders"
            options={({ route }) => ({
              tabBarLabel: "Completed Orders",
            })}
            component={completedOrders}
          />
        </Tab.Navigator>
      </OrderContainer>
    </SafeArea>
  );
};
