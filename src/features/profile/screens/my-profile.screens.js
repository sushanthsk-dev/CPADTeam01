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

const MyProfileContainer = styled.View`
  margin-top: 70px;
  align-items: center;
`;

const ProfileDetails = styled.View``;

export const MyProfileScreen = ({ navigation }) => {
  const { user, isLoading, updateUserDetails, response } = useContext(
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
      phoneno: user.phoneno !== null ? user.phoneno.toString() : "",
    },
  });
  const onSubmit = async (data) => {
    const res = await updateUserDetails(data);

    if (res === "success") {
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    }
  };
  const UpdateButton = styled(Button)`
    width: 340px;
  `;
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
                rules={{ required: true }}
                name="name"
                divide={false}
                text={true}
                control={control}
              />
              {errors.name && (
                <Text variant="error">Please enter the address</Text>
              )}
            </Spacer>
            <Spacer size="large">
              <InputController
                label="Email"
                rules={{ required: true }}
                name="email"
                divide={false}
                text={true}
                control={control}
              />
              {errors.email && (
                <Text variant="error">Please enter the address</Text>
              )}
            </Spacer>

            <Spacer size="large">
              <InputController
                label="Phone Number"
                rules={{ required: true }}
                name="phoneno"
                divide={false}
                text={false}
                control={control}
                maxLength={10}
              />
              {errors.phoneno && (
                <Text variant="error">Please enter the address</Text>
              )}
            </Spacer>
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
