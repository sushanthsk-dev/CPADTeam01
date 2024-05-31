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
import { AgentMechanicContext } from "../../../services/agent-mechanic/agent-mechanic.context";
import { toastMessage } from "../../../components/toast-message/toast.component";

const Container = styled.View`
  margin-top: 50px;
  margin-bottom: 30px;

  align-items: center;
  justify-content: center;
`;

const TextError = styled(Text)`
  margin-left: 5px;
  width: 340px;
  flex-wrap: wrap;
`;

const Button = styled(ReactButton)`
  width: 340px;
`;

export const AddUserScreen = ({ navigation, route }) => {
  const { createAgentMechanic, isLoading, error, setError } =
    useContext(AgentMechanicContext);
  const { role, user = null } = route.params;

  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user !== null ? user.name : "Anoop",
      email: user !== null ? user.email : "anoop14@gmail.com",
      workAssignedLocation:
        user !== null ? user.workAssignedLocation : "moodbidri",
      phoneno: user !== null ? user.phoneno.toString() : "9876543210",
      pincode: user !== null ? user.pincode.toString() : "574227",
      role: user !== null ? user.role : role === "agent" ? "agent" : "mechanic",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    const res = await createAgentMechanic(data, role);
    if (res === "success") {
      toastMessage("Mechanic created successfully");
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    () => setError(null);
  }, []);

  return (
    <SafeArea>
      <Header
        title={`Add  ${role} details`}
        toLeft={true}
        navigation={navigation}
      />
      <ScrollView>
        <Container>
          <KeyboardAvoidingView behavior="height">
            <Spacer size="larger">
              <InputController
                label="Name(Required)*"
                rules={{ required: true, pattern: /^[a-zA-Z_ ]*$/ }}
                name="name"
                placeValue={setPlaceValue}
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
            <Spacer size="larger">
              <InputController
                label="Email(Required)*"
                rules={{
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                }}
                name="email"
                placeValue={setPlaceValue}
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
            <Spacer size="larger">
              <InputController
                label="phoneno(Required)*"
                rules={{ required: true, pattern: /^[789]\d{9}$/ }}
                name="phoneno"
                placeValue={setPlaceValue}
                divide={false}
                text={false}
                control={control}
                maxLength={10}
              />
              {errors.phoneno && (
                <Text variant="error">
                  {errors.phoneno.type === "required"
                    ? "Please enter the phone number"
                    : "Please enter valid phone number"}
                </Text>
              )}
            </Spacer>
            <Spacer size="larger">
              <InputController
                label="Location for work(Required)*"
                rules={{ required: true, pattern: /^[a-zA-Z]+$/ }}
                name="workAssignedLocation"
                placeValue={setPlaceValue}
                divide={false}
                text={true}
                control={control}
              />
              {errors.location && (
                <Text variant="error">
                  {errors.locatio.type === "required"
                    ? "Please enter the location"
                    : "Please enter only alphabet letters"}
                </Text>
              )}
            </Spacer>
            <Spacer size="larger">
              <InputController
                label="Pincode(Required)*"
                rules={{ required: true, pattern: /^(\d{4}|\d{6})$/ }}
                name="pincode"
                divide={false}
                text={false}
                control={control}
                maxLength={6}
              />
              {errors.pincode && (
                <Text variant="error">
                  {errors.pincode.type === "required"
                    ? "Please enter pincode address"
                    : "Please enter valid 6 digit pincode "}
                </Text>
              )}
            </Spacer>
            {error && (
              <Spacer size="larger">
                <TextError variant="error">{error}</TextError>
              </Spacer>
            )}
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
