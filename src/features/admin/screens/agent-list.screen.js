import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfileCard } from "../components/profile-card.component";
import { Text } from "../../../components/typography/text.component";

const Tab = createMaterialTopTabNavigator();

const Container = styled.View`
  margin-top: 70px;
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

export const AgentListScreen = ({ navigation, name }) => {
  const onAssign = () => {
    console.log("Assigned");
    setTimeout(() => {
      navigation.navigate("OrderListScreen");
    }, 500);
  };
  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title="Assign Agent" />
      <Container>
        <CardContainer>
          <TouchableOpacity onPress={onAssign}>
            <ProfileCard name={name} />
          </TouchableOpacity>
        </CardContainer>
      </Container>
    </SafeArea>
  );
};
