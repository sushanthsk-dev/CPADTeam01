import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
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
  return (
    <SafeArea>
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
          <FeatureCard title="Periodic Service" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
          <FeatureCard title="Mechanic Nearby" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DocumentScreen")}>
          <FeatureCard title="Insurance & Emission Test Document" />
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
