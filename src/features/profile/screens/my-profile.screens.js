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
import { ProfileContext } from "../../../services/profile-details/profile.context";

const MyProfileContainer = styled.View`
  margin-top: 56px;
  align-items: center;
`;

const ProfileDetails = styled.View``;

export const MyProfileScreen = ({ navigation }) => {
  const { saveProfileDetails, profileDetails, isProfileLoading } =
    useContext(ProfileContext);
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
                placeValue={
                  profileDetails.email !== null ? profileDetails.email : null
                }
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
                placeValue={
                  profileDetails.phoneno !== null
                    ? profileDetails.phoneno
                    : null
                }
                divide={false}
                text={true}
                control={control}
              />
              {errors.phoneno && (
                <Text variant="error">Please enter the address</Text>
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
      </ScrollView>
    </SafeArea>
  );
};
