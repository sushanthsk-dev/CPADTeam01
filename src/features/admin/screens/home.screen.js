import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FeatureCard } from "../components/home.component";

const View = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
`;
const LogoImageContainer = styled.Image`
  width: 241px;
  height: 50px;
  transform: scale(0.6);
  margin: 6px auto;
`;
export const AdminScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ManageProfileScreen", { name: "agent" })
          }
        >
          <FeatureCard title="Manage Agent" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ManageProfileScreen", { name: "mechanic" })
          }
        >
          <FeatureCard title="Manage Mechanic" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("OrderListScreen")}
        >
          <FeatureCard title="Manage Orders" />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
