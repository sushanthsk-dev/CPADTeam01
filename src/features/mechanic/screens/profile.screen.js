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
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";
import { AddressCard } from "../components/address-card.component";

const Container = styled(ScrollView)`
  margin-top: 70px;
  height: 100%;
  padding: ${(props) => props.theme.space[2]};
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
  margin-bottom: ${(props) => props.theme.space[3]};
  border-bottom-width: 0.5px;
  border-color: grey;
`;

const LogoutSpacerView = styled.View`
  width: 100%;
`;

const LogoutButton = styled(Button)`
  border-radius: 5px;
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

export const MechanicProfileScreen = ({ navigation, route }) => {
  const isLoading = false;

  return (
    <SafeArea>
      <Header title="Mechanic Details" />
      <Container>
        <PhotoContainer>
          <ProfilePhotoContainer />
        </PhotoContainer>
        <Details>
          <SpacerView>
            <TextData variant="subHead">Name</TextData>
            <TextData variant="body">Virat</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Email</TextData>
            <TextData variant="body">xys@gmail.com</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Work assigned location</TextData>
            <TextData variant="body">Moodbidri</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Role</TextData>
            <TextData variant="body">Mechanic</TextData>
          </SpacerView>
          <SpacerView>
            <TextData variant="subHead">Phone no</TextData>
            <TextData variant="body">9876543210</TextData>
          </SpacerView>
        </Details>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("DropMechanicLocationScreen")}
        >
          Change Location
        </Button>
      </Container>
      <LogoutSpacerView>
        <LogoutButton mode="outline" color="#6200EE">
          Logout
        </LogoutButton>
      </LogoutSpacerView>
    </SafeArea>
  );
};
