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

export const ProfileViewScreen = ({ navigation, route }) => {
  const isLoading = false;
  const { name, user } = route.params;
  console.log(user);
  const onSubmit = () => {
    Alert.alert("Are you sure you want to deactivate", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <SafeArea>
      <Header title="Agent Details" toLeft={true} navigation={navigation} />
      <Container>
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
            <TextData variant="body">x{user.email}</TextData>
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
        <Spacer size="larger" position="bottom">
          {!isLoading ? (
            <>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate("AddUserScreen", { name: name })
                }
              >
                Update
              </Button>
              <Spacer position="top" size="large" />
              <Button mode="contained" onPress={onSubmit} color={Colors.red900}>
                Deactive
              </Button>
            </>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </Container>
    </SafeArea>
  );
};
