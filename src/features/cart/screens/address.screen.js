import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { InputController } from "../../../components/form-control/input-control.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AddressContext } from "../../../services/address/address.context";
import { toastMessage } from "../../../components/toast-message/toast.component";

const AddressContainer = styled.View`
  margin-top: 30%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PincodeCityContainer = styled.View`
  flex-direction: row;
  width: 340px;
  justify-content: space-between;
`;

const AddressButton = styled(Button)`
  width: 340px;
`;

export const AddressScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const { address, addAddress, isLoading, setAddress, error, setError } =
    useContext(AddressContext);
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: address ? address.address : "",
      city: address ? address.city : "",
      pincode: address ? address.pincode : "574227",
      state: address ? address.state : "",
      phoneno: address
        ? address.phoneno.toString()
        : user.phoneno
        ? user.phoneno.toString()
        : "",
    },
  });

  const { headerToken } = useContext(AuthenticationContext);
  const onSubmit = async (data) => {
    //try 3
    const res = await addAddress(data);
    console.log(res);
    if (res === "success") {
      toastMessage("Address added successfully");
      setError(null);
      navigation.goBack();
    }
  };
  React.useEffect(() => {
    () => setError(null);
  }, []);

  return (
    <SafeArea>
      <Header title="Manage Address" toLeft={true} navigation={navigation} />
      <ScrollView>
        <AddressContainer>
          <KeyboardAvoidingView behavior="height">
            <Spacer size="larger">
              <InputController
                label="Address(Required)*"
                divide={false}
                rules={{
                  required: true,
                  pattern: /^[a-zA-Z_ ]*$/,
                }}
                name="address"
                control={control}
              />
              {errors.address && (
                <Text variant="error">
                  {errors.address.type === "required"
                    ? "Please enter the address"
                    : "Please enter only alphabet letters"}
                </Text>
              )}
            </Spacer>
            <PincodeCityContainer>
              <Spacer size="four_large">
                <InputController
                  label="City(Required)*"
                  rules={{ required: true, pattern: /^[a-zA-Z_ ]*$/ }}
                  name="city"
                  divide={true}
                  text={true}
                  control={control}
                />
              </Spacer>
              <Spacer size="four_large">
                <InputController
                  label="Pincode(Required)*"
                  rules={{ required: true }}
                  name="pincode"
                  readOnly={true}
                  divide={true}
                  text={false}
                  control={control}
                />
                {errors.pincode && (
                  <Text variant="error">
                    {errors.pincode.type === "required"
                      ? "Please enter the pincode"
                      : "Please enter valid pincode"}
                  </Text>
                )}
              </Spacer>
            </PincodeCityContainer>
            <Spacer>
              {errors.city && (
                <Text variant="error">
                  {errors.city.type === "required"
                    ? "Please enter the city"
                    : "Please enter a alphabet letters"}
                </Text>
              )}
            </Spacer>
            <Spacer size="four_large">
              <InputController
                label="State(Required)*"
                rules={{ required: true, pattern: /^[a-zA-Z_ ]*$/ }}
                name="state"
                text={true}
                divide={false}
                control={control}
              />
              {errors.state && (
                <Text variant="error">
                  {errors.state.type === "required"
                    ? "Please enter the state"
                    : "Please enter only alphabet letters"}
                </Text>
              )}
            </Spacer>
            <Spacer size="four_large">
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
                    ? "Please enter the phone number"
                    : "Please enter valid phone number"}
                </Text>
              )}
            </Spacer>
            {error !== null && (
              <Spacer position="top" size="medium">
                <Text variant="error">{error}</Text>
              </Spacer>
            )}
            <Spacer size="medium">
              {!isLoading ? (
                <AddressButton
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                >
                  Save Address
                </AddressButton>
              ) : (
                <ActivityIndicator animating={true} color={Colors.blue300} />
              )}
            </Spacer>
          </KeyboardAvoidingView>
        </AddressContainer>
      </ScrollView>
    </SafeArea>
  );
};
