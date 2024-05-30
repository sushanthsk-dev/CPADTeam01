import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { NetworkContext } from "../../../services/internetConnectionCheck/internet-network.context";
import { NoInternetErrorScreen } from "../../gps-map-error/no-internet-connection";
import { FeatureCard } from "../../home/components/home.component";

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
  const context = React.useContext(NetworkContext);
  return (
    <SafeArea>
      {context.isConnected && (
        <NoInternetErrorScreen show={true} navigation={navigation} />
      )}

      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ManageProfileScreen", { role: "agent" })
          }
        >
          <FeatureCard
            title="Manage Agent"
            imgSrc="https://carzoo21.s3.amazonaws.com/car-agent.png"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ManageProfileScreen", { role: "mechanic" })
          }
        >
          <FeatureCard
            title="Manage Mechanic"
            imgSrc="https://carzoo21.s3.amazonaws.com/car-mechanic.png"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("OrderListScreen")}
        >
          <FeatureCard
            title="Manage Service Orders"
            imgSrc="https://carzoo21.s3.amazonaws.com/manage-car-periodic-service.png"
          />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
