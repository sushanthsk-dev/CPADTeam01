import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfilePhotoContainer } from "../components/profile-photo-container.component";
import { InputController } from "../../../components/form-control/input-control.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { toastMessage } from "../../../components/toast-message/toast.component";

const MyProfileContainer = styled.View`
  margin-top: 60px;
  padding-top: 10px;
  align-items: center;
`;

const ProfileDetails = styled.View``;

export const MyProfileScreen = ({ navigation }) => {
  const { user, isLoading, updateUserDetails, response, error, setError } =
    useContext(AuthenticationContext);

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
      phoneno:
        user.phoneno !== null
          ? user.phoneno
            ? user.phoneno.toString()
            : ""
          : "",
    },
  });
  const onSubmit = async (data) => {
    const res = await updateUserDetails(data);

    if (res === "success") {
      toastMessage("Updated user details");
      setTimeout(() => {
        navigation.goBack();
      }, 200);
    }
  };
  const UpdateButton = styled(Button)`
    width: 340px;
  `;

  React.useEffect(() => {
    () => setError(null);
  }, []);
  return (
    <SafeArea>
      <Header toLeft={true} title="My Profile" navigation={navigation} />
      <ScrollView>
        <MyProfileContainer>
          <ProfilePhotoContainer />
          <ProfileDetails>
            <Spacer>
              <InputController
                label="Name"
                rules={{ required: true, pattern: /^[a-zA-Z_ ]*$/ }}
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
                label="Email"
                rules={{
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                }}
                name="email"
                divide={false}
                text={true}
                control={control}
              />
              {errors.email && (
                <Text variant="error">
                  {errors.email.type === "required"
                    ? "Please enter the email address"
                    : "Please enter valid email address"}
                </Text>
              )}
            </Spacer>

            <Spacer size="large">
              <InputController
                label="Phone number(Required)*"
                rules={{ required: true, pattern: /^[6-9]\d{9}$/g }}
                name="phoneno"
                divide={false}
                text={false}
                control={control}
                maxLength={10}
              />
              {errors.phoneno && (
                <Text variant="error">
                  {errors.phoneno.type === "required"
                    ? "Please enter  phone number"
                    : "Please enter valid phone number"}
                </Text>
              )}
            </Spacer>
            {error && (
              <Spacer position="top" size="larger">
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
      </ScrollView>
    </SafeArea>
  );
};
