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
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { toastMessage } from "../../../components/toast-message/toast.component";

const MyProfileContainer = styled.View`
  margin-top: 60px;
  padding-top: 10px;
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
  // const {
  //   saveProfileDetails,
  //   user = null,
  //   isProfileLoading,
  // } = useContext(ProfileContext);

  const { user, isLoading, updateUserDetails, onLogout, error } = useContext(
    AuthenticationContext
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user !== null ? user.name : "",
      email: user !== null ? user.email : "",
      phoneno: user !== null ? user.phoneno : "",
      role: user !== null ? user.role : "Admin",
    },
  });
  const onSubmit = async (data) => {
    const res = await updateUserDetails(data);
    if (res === "success") {
      toastMessage("Updated successfully");
    }
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
                rules={{
                  required: true,
                  pattern: /^[a-zA-Z_ ]*$/,
                }}
                name="name"
                divide={false}
                text={true}
                control={control}
              />
              {errors.name && (
                <Text variant="error">
                  {errors.name.type === "required"
                    ? "Please enter the name"
                    : "Please enter only alphabet letters"}
                </Text>
              )}
            </Spacer>
            <Spacer size="large">
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
                placeValue={user.email !== null ? user.email : null}
                divide={false}
                text={true}
                control={control}
              />
              {errors.email && (
                <Text variant="error">Please enter the email</Text>
              )}
            </Spacer>
            {error && (
              <Spacer>
                <Text variant="error">{error}</Text>
              </Spacer>
            )}
            <Spacer size="large">
              {!isLoading ? (
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
          <LogoutButton mode="outline" color="#6200EE" onPress={onLogout}>
            Logout
          </LogoutButton>
        </SpacerView>
      </ScrollView>
    </SafeArea>
  );
};
