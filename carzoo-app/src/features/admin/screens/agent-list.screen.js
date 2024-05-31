import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfileCard } from "../components/profile-card.component";
import { Text } from "../../../components/typography/text.component";
import { AgentMechanicContext } from "../../../services/agent-mechanic/agent-mechanic.context";
import { BookingOrderContext } from "../../../services/order-list/booking-order.context";
import { toastMessage } from "../../../components/toast-message/toast.component";

const Tab = createMaterialTopTabNavigator();

const Container = styled.View`
  margin-top: 60px;
  padding-top: 10px;
  flex: 1;
`;

const CardContainer = styled(ScrollView)`
  background-color: #fff;
`;

const AddButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 999;
  border-radius: 25px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  padding: ${(props) => props.theme.space[2]};
  bottom: 20px;
  right: 24px;
`;

export const AgentListScreen = ({ navigation, name, route }) => {
  const { orderId } = route.params;
  const { agentMechanic = null, getAgentMechanic } =
    React.useContext(AgentMechanicContext);
  const { assignAgent, getBookingOrders } =
    React.useContext(BookingOrderContext);
  const onAssign = async (agentId) => {
    console.log("Assigned");
    const res = await assignAgent(orderId, agentId);
    if (res === "success") {
      navigation.navigate("OrderListScreen");
    }
    // setTimeout(() => {
    //   navigation.navigate("OrderListScreen");
    // }, 500);
  };

  React.useEffect(() => {
    getAgentMechanic("agent");
    getBookingOrders();
  }, []);
  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title="Assign Agent" />
      <Container>
        <CardContainer>
          {agentMechanic !== null &&
            agentMechanic.map(
              (agent) =>
                agent.role === "agent" &&
                agent.active === true && (
                  <TouchableOpacity
                    onPress={() => onAssign(agent._id)}
                    key={agent._id}
                  >
                    <ProfileCard user={agent} />
                  </TouchableOpacity>
                )
            )}
        </CardContainer>
      </Container>
    </SafeArea>
  );
};
