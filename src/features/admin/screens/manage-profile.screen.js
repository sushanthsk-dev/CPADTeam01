import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfileCard } from "../components/profile-card.component";
import { Text } from "../../../components/typography/text.component";
import { ManageProfile } from "../components/manage-profile.component";

const Tab = createMaterialTopTabNavigator();

const OrderContainer = styled.View`
  margin-top: 60px;
  padding-top: 10px;
  flex: 1;
`;

export const ManageProfileScreen = ({ navigation, route }) => {
  const { role = "agent" } = route.params;

  return <ManageProfile navigation={navigation} role={role} />;
};
