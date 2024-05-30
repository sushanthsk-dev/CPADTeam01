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
import { toastMessage } from "../../../components/toast-message/toast.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AgentMechanicContext } from "../../../services/agent-mechanic/agent-mechanic.context";
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";

const Container = styled(ScrollView)`
  margin-top: 60px;
  padding-top: 10px;
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
  const { deactivateAgentMechanic, isLoading, activateAgentMechanic } =
    React.useContext(AgentMechanicContext);
  const { role, user } = route.params;
  const onDeactivate = () => {
    Alert.alert("Deactivate", "Are you sure you want deactivate", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const res = await deactivateAgentMechanic(user._id, role);
          if (res === "success") {
            toastMessage(`${role} deactivated `);
            navigation.goBack();
          }
        },
      },
    ]);
  };
  const onActivate = () => {
    Alert.alert("Activate", "Are you sure you want active", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const res = await activateAgentMechanic(user._id, role);
          if (res === "success") {
            toastMessage(`${role} activated successfully`);
            navigation.goBack();
          }
        },
      },
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
        <Spacer size="larger" position="bottom">
          {!isLoading ? (
            <>
              <Button
                mode="contained"
                onPress={() =>
                  navigation.navigate("AddUserScreen", {
                    role: role,
                    user: user,
                  })
                }
              >
                Update
              </Button>
              <Spacer position="top" size="large" />
              <Button
                mode="contained"
                onPress={user.active ? onDeactivate : onActivate}
                color={user.active ? Colors.red900 : Colors.green600}
              >
                {user.active ? "Deactive" : "Activate"}
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
