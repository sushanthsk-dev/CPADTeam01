import React from "react";
import { ScrollView, Alert } from "react-native";
import {
  Button as ReactButton,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";

const Container = styled(ScrollView)`
  margin-top: 60px;
  padding-top: 10px;
  height: 100%;
  padding: ${(props) => props.theme.space[2]};
  margin-bottom: 30px;
`;
const PhotoContainer = styled.View`
  align-items: center;
`;

const TextData = styled(Text)`
  margin-bottom: ${(props) => props.theme.space[3]};
`;
const Details = styled.View``;

const Button = styled(ReactButton)`
  width: 344px;
  justify-content: center;
  margin: 0 ${(props) => props.theme.space[3]} auto auto;
`;
const SpacerView = styled.View`
  padding-left: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[2]};
  border-bottom-width: 0.5px;
  border-color: grey;
`;

const LogoutSpacerView = styled.View`
  width: 100%;

  margin-top: ${(props) => props.theme.space[2]};
`;

const LogoutButton = styled(Button)`
  border-radius: 5px;

  margin: auto;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const AgentProfileScreen = ({ navigation, route }) => {
  const { onLogout, user } = React.useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Header title="Agent Details" toLeft={true} navigation={navigation} />
      <Container showsVerticalScrollIndicator={false}>
        <PhotoContainer>
          <ProfilePhotoContainer />
        </PhotoContainer>
        <Details>
          <SpacerView>
            <TextData variant="subHead">Name</TextData>
            <TextData variant="body">{user.name}</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Email</TextData>
            <TextData variant="body">{user.email}</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Phone no</TextData>
            <TextData variant="body">{user.phoneno}</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Work assigned location</TextData>
            <TextData variant="body">{user.workAssignedLocation}</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Role</TextData>
            <TextData variant="body">{user.role}</TextData>
          </SpacerView>
        </Details>
        <LogoutSpacerView>
          <LogoutButton
            mode="outline"
            color="#6200EE"
            onPress={() => onLogout()}
          >
            Logout
          </LogoutButton>
        </LogoutSpacerView>
      </Container>
    </SafeArea>
  );
};
