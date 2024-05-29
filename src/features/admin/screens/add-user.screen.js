import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import {
  Button as ReactButton,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { InputController } from "../../../components/form-control/input-control.component";

const Container = styled.View`
  margin-top: 50px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Button = styled(ReactButton)`
  width: 340px;
`;

export const AddUserScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const isLoading = false;
  const user = false;
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user !== null ? user.name : "",
      email: user !== null ? user.email : "",
      location: user !== null ? user.location : "",
      phoneno: user !== null ? user.phoneno : "",
      pincode: user !== null ? user.pincode : "",
      role: user !== null ? user.role : name === "agent" ? "agent" : "mechanic",
    },
  });
  const onSubmit = (data) => {
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };
  return (
    <SafeArea>
      <Header
        title={`Add  ${name} details`}
        toLeft={true}
        navigation={navigation}
      />
      <ScrollView>
        <Container>
          <KeyboardAvoidingView behavior="height">
            <Spacer size="larger">
              <InputController
                label="Name(Required)*"
                rules={{ required: true }}
                name="name"
                placeValue={setPlaceValue}
                divide={false}
                text={true}
                control={control}
              />
              {errors.name && (
                <Text variant="error">Please enter the name</Text>
              )}
            </Spacer>
            <Spacer size="larger">
              <InputController
                label="Email(Required)*"
                rules={{ required: true }}
                name="email"
                placeValue={setPlaceValue}
                divide={false}
                text={true}
                control={control}
              />
              {errors.email && (
                <Text variant="error">Please enter the email</Text>
              )}
            </Spacer>
            <Spacer size="larger">
              <InputController
                label="phoneno(Required)*"
                rules={{ required: true }}
                name="phoneno"
                placeValue={setPlaceValue}
                divide={false}
                text={false}
                control={control}
              />
              {errors.phoneno && (
                <Text variant="error">Please enter the phone no</Text>
              )}
            </Spacer>
            <Spacer size="larger">
              <InputController
                label="Location for work(Required)*"
                rules={{ required: true }}
                name="location"
                placeValue={setPlaceValue}
                divide={false}
                text={true}
                control={control}
              />
              {errors.location && (
                <Text variant="error">Please enter the location</Text>
              )}
            </Spacer>
            <Spacer size="larger">
              <InputController
                label="Pincode(Required)*"
                rules={{ required: true }}
                name="pincode"
                divide={false}
                text={false}
                control={control}
              />
              {errors.pincode && (
                <Text variant="error">Please enter pincode</Text>
              )}
            </Spacer>
            <Spacer size="larger">
              {!isLoading ? (
                <Button mode="contained" onPress={handleSubmit(onSubmit)}>
                  Save
                </Button>
              ) : (
                <ActivityIndicator animating={true} color={Colors.blue300} />
              )}
            </Spacer>
          </KeyboardAvoidingView>
        </Container>
      </ScrollView>
    </SafeArea>
  );
};
