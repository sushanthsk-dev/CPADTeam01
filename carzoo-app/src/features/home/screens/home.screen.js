import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { NetworkContext } from "../../../services/internetConnectionCheck/internet-network.context";
import { NoInternetErrorScreen } from "../../gps-map-error/no-internet-connection";
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
export const HomeScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthenticationContext);
  const context = React.useContext(NetworkContext);
  return (
    <SafeArea>
      {context.isConnected && (
        <NoInternetErrorScreen show={true} navigation={navigation} />
      )}
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />

      <View>
        <TouchableOpacity
          onPress={() => {
            user.myCar
              ? navigation.navigate("PeriodicServiceScreen")
              : navigation.navigate("CarScreen", {
                  routeName: "PeriodicServiceScreen",
                });
          }}
        >
          <FeatureCard
            title="Periodic Service"
            imgSrc="https://carzoo21.s3.amazonaws.com/periodic-service.png"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
          <FeatureCard
            title="Mechanic Nearby"
            imgSrc="https://carzoo21.s3.amazonaws.com/nearby-mechanic.png"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DocumentScreen")}>
          <FeatureCard
            title="Insurance & Emission Test Document"
            imgSrc="https://carzoo21.s3.amazonaws.com/document.png"
          />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
