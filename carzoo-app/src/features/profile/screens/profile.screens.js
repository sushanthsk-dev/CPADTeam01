import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProfilePhotoContainer } from "../components/profile-photo-container.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ProfileFeaturesContainer = styled.View`
  width: 100%;
  margin-top: ${(props) => props.theme.space[3]};
`;

const SpacerView = styled.View`
  width: 100%;
  margin: ${(props) => props.theme.space[3]};
`;

const LogoutButton = styled(Button)`
  border-radius: 5px;
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;
const ProfileFeature = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  padding: ${(props) => props.theme.space[3]};
  margin-bottom: 2px;
  border-bottom-color: ${(props) => props.theme.colors.ui.secondary};
`;

const ProfileFeatureList = ({ title }) => (
  <ProfileFeature>
    <Text variant="subTitle">{title}</Text>
    <MaterialCommunityIcons name="greater-than" size={18} color="#757575" />
  </ProfileFeature>
);

export const ProfileScreen = ({ navigation }) => {
  const { user, onLogout } = React.useContext(AuthenticationContext);

  return (
    <SafeArea>
      <ProfileContainer>
        <ProfilePhotoContainer />
        <Text>{user.name}</Text>
        <ProfileFeaturesContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyProfileScreen")}
          >
            <ProfileFeatureList title="My Profile" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyAddressScreen")}
          >
            <ProfileFeatureList title="My Address" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyOrderScreen")}
          >
            <ProfileFeatureList title="My Order" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MyCarScreen", { routeName: "ProfileScreen" })
            }
          >
            <ProfileFeatureList title="My Car" />
          </TouchableOpacity>
        </ProfileFeaturesContainer>
        <SpacerView>
          <LogoutButton
            mode="outline"
            color="#6200EE"
            onPress={() => onLogout()}
          >
            Logout
          </LogoutButton>
        </SpacerView>
      </ProfileContainer>
    </SafeArea>
  );
};
