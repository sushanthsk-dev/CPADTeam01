import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { InputController } from "../../../components/form-control/input-control.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { ProfileContext } from "../../../services/profile-details/profile.context";
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";

const MyProfileContainer = styled.View`
  margin-top: 70px;
  align-items: center;
`;

const SpacerView = styled.View`
  width: 100%;
  margin-top: ${(props) => props.theme.space[3]};
`;

const LogoutButton = styled(Button)`
  border-radius: 5px;
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
`;

const ProfileDetails = styled.View``;

export const AdminProfileScreen = ({ navigation }) => {
  const {
    saveProfileDetails,
    profileDetails = null,
    isProfileLoading,
  } = useContext(ProfileContext);
  const isLoading = false;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profileDetails !== null ? profileDetails.name : "",
      email: profileDetails !== null ? profileDetails.email : "",
      phoneno: profileDetails !== null ? profileDetails.phoneno : "",
      role: profileDetails !== null ? profileDetails.role : "Admin",
    },
  });
  const onSubmit = (data) => {
    saveProfileDetails(data);
    setTimeout(() => {
      console.log(data);
    }, 100);
  };
  const UpdateButton = styled(Button)`
    width: 340px;
  `;
  return (
    <SafeArea>
      <Header title="My Profile" navigation={navigation} />
      <ScrollView>
        <MyProfileContainer>
          <ProfilePhotoContainer />
          <ProfileDetails>
            <Spacer>
              <InputController
                label="Name"
                rules={{ required: true }}
                name="name"
                divide={false}
                text={true}
                control={control}
              />
              {errors.name && (
                <Text variant="error">Please enter the name</Text>
              )}
            </Spacer>
            <Spacer>
              <InputController
                label="Role"
                rules={{ required: true }}
                name="role"
                divide={false}
                text={true}
                defaultValue="Admin"
                control={control}
                readOnly={true}
              />
            </Spacer>
            <Spacer size="large">
              <InputController
                label="Email"
                rules={{ required: true }}
                name="email"
                placeValue={
                  profileDetails.email !== null ? profileDetails.email : null
                }
                divide={false}
                text={true}
                control={control}
              />
              {errors.email && (
                <Text variant="error">Please enter the email</Text>
              )}
            </Spacer>

            <Spacer size="large">
              {!isProfileLoading ? (
                <UpdateButton mode="contained" onPress={handleSubmit(onSubmit)}>
                  Update Details
                </UpdateButton>
              ) : (
                <ActivityIndicator animating={true} color={Colors.blue300} />
              )}
            </Spacer>
          </ProfileDetails>
        </MyProfileContainer>
        <SpacerView>
          <LogoutButton mode="outline" color="#6200EE">
            Logout
          </LogoutButton>
        </SpacerView>
      </ScrollView>
    </SafeArea>
  );
};
