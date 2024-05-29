import React from "react";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { CheckBox, ScrollView } from "react-native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { InputController } from "../../../components/form-control/input-control.component";
const DocumentContainer = styled(ScrollView)`
  margin-top: 70px;
  flex: 1;
  margin-left: auto;

  margin-right: auto;
`;

const DocumentButton = styled(Button)`
  width: 340px;
  margin: 10px 0px;
`;

const CheckBoxView = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

export const AddInsuranceDocument = ({ insurance = false, navigation }) => {
  const [isAlertSelected, setAlertSelection] = React.useState(false);
  const isLoading = false;
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: insurance !== null ? insurance.address : "",
      policyNo: insurance !== null ? insurance.city : "",
      insuredName: insurance !== null ? insurance.pincode : "",
      expiryDate: insurance !== null ? insurance.state : "",
    },
  });

  const onSubmit = (data) => {
    addAddress(data);
    setTimeout(() => {
      navigation.navigate("CheckoutScreen");
    }, 100);
  };

  return (
    <DocumentContainer>
      <Spacer size="large">
        <InputController
          label="Insurance Company Name(Required)*"
          rules={{ required: true }}
          name="companyName"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.companyName && (
          <Text variant="error">Please enter the insurance company name</Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="Policy No(Required)*"
          rules={{ required: true }}
          name="policyNo"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.policyNo && (
          <Text variant="error">Please enter the policy number</Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="Insured's Name(Required)*"
          rules={{ required: true }}
          name="insuredName"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.insuredName && (
          <Text variant="error">Please enter the Insured's Name</Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="Expiry Date (DD:MM:YYYY) (Required)*"
          rules={{ required: true }}
          name="expiryDate"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.expiryDate && (
          <Text variant="error">Please enter the insurance expiry date</Text>
        )}
      </Spacer>
      <CheckBoxView>
        <CheckBox value={isAlertSelected} onValueChange={setAlertSelection} />
        <Text variant="caption">Alert me before one week of expiry date</Text>
      </CheckBoxView>
      <Spacer size="medium">
        {!isLoading ? (
          <>
            <DocumentButton mode="contained" onPress={handleSubmit(onSubmit)}>
              Save Insurance Details
            </DocumentButton>
            <DocumentButton
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              color={Colors.red900}
              disabled={!insurance ? true : false}
            >
              Delete Insurance Details
            </DocumentButton>
          </>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
      </Spacer>
    </DocumentContainer>
  );
};

export const AddEmissionDocument = ({ emission = false, navigation }) => {
  const [isAlertSelected, setAlertSelection] = React.useState(false);
  const isLoading = false;
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      regNo: emission !== null ? emission.address : "",
      puucNo: emission !== null ? emission.puucNo : "",
      customerName: emission !== null ? emission.customerName : "",
      expiryDate: emission !== null ? emission.expiryDate : "",
    },
  });

  const onSubmit = (data) => {
    addAddress(data);
    setTimeout(() => {
      navigation.navigate("CheckoutScreen");
    }, 100);
  };

  return (
    <DocumentContainer>
      <Spacer size="large">
        <InputController
          label="Vehicle Reg No(Required)*"
          rules={{ required: true }}
          name="regNo"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.regNo && (
          <Text variant="error">Please enter the vehicle reg no</Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="PUUC No(Required)*"
          rules={{ required: true }}
          name="puucNo"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.puucNo && (
          <Text variant="error">Please enter the puuc number</Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="Customer's Name(Required)*"
          rules={{ required: true }}
          name="customerName"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.insuredName && (
          <Text variant="error">Please enter the customer's name</Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label=" Expiry Date(DD:MM:YYYY)(Required)*"
          rules={{ required: true }}
          name="expiryDate"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.expiryDate && (
          <Text variant="error">Please enter the expiry date</Text>
        )}
      </Spacer>
      <CheckBoxView>
        <CheckBox value={isAlertSelected} onValueChange={setAlertSelection} />
        <Text variant="caption">Alert me before one week of expiry date</Text>
      </CheckBoxView>
      <Spacer size="medium">
        {!isLoading ? (
          <>
            <DocumentButton mode="contained" onPress={handleSubmit(onSubmit)}>
              Save Emission Details
            </DocumentButton>
            <DocumentButton
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              color={Colors.red900}
              disabled={!emission ? true : false}
            >
              Delete Emission Details
            </DocumentButton>
          </>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
      </Spacer>
    </DocumentContainer>
  );
};
