import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { CheckBox, ScrollView, TouchableOpacity } from "react-native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { InputController } from "../../../components/form-control/input-control.component";
import { onChange } from "react-native-reanimated";
import { IPADDRESS } from "../../../utils/env";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
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
const DateView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const DateInputController = styled(InputController)`
  width: 280px;
`;

export const AddInsuranceDocument = ({ navigation }) => {
  const { headerToken } = React.useContext(AuthenticationContext);
  const [expiryDate, setExpiryDate] = useState();
  const [expiryDateError, setExpiryDateError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [minDate, setMinDate] = useState(null);

  const isLoading = false;
  const insurance = null;
  // const insurance = null;
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      insuranceCompanyName:
        insurance !== null
          ? insurance.insuranceCompanyName
          : "Oriental Company",
      policyNo: insurance !== null ? insurance.policyNo : "192939/28/2021/2222",
      registrationNo:
        insurance !== null ? insurance.registrationNo : "KA21HA2020",
      insuredName: insurance !== null ? insurance.insuredName : "Sushanth",
    },
  });

  const onSubmit = async (data) => {
    if (!expiryDate) {
      setExpiryDateError("Please select expiryDate");
      return;
    }
    data.expiryDate = expiryDate;
    console.log(data);

    try {
      const res = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${headerToken}` },
        url: `${IPADDRESS}/api/v1/document/insurance`,
        data: {
          insuranceDocument: data,
        },
      });
      if (res.data.status === "success") {
        console.log("success");
      }
      console.log(res.data.status);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  console.log(errors);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || expiryDate;
    // setShowDatePicker(Platform.OS === "ios");
    console.log(currentDate);
    setShowDatePicker(false);
    const month =
      currentDate.getMonth() < 9
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1;
    setExpiryDate(
      `${month}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    );
  };

  useEffect(() => {
    const setMiniumDate = () => {
      let minDate = new Date();
      minDate.setDate(minDate.getDate() + 3);
      console.log(minDate);
      setMinDate(minDate);
    };
    setMiniumDate();
  }, []);
  return (
    <DocumentContainer>
      <Spacer size="large">
        <InputController
          label="Insurance Company Name(Required)*"
          rules={{ required: true }}
          name="insuranceCompanyName"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.insuranceCompanyName && (
          <Text variant="error">Please enter the insurance company name</Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="Reg No(Required)*"
          rules={{
            required: true,
            pattern: /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/,
          }}
          name="registrationNo"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.registrationNo && (
          <Text variant="error">
            {errors.registrationNo.type === "required"
              ? "Please enter the reg no"
              : "Please enter valid registration no"}
          </Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="Policy No(Required)*"
          rules={{
            required: true,
            pattern: /[0-9]{6}\/[0-9]{2}\/[0-9]{4}\/[0-9]{4}$/,
          }}
          name="policyNo"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.policyNo && (
          <Text variant="error">
            {errors.policyNo.type === "required"
              ? "Please enter policy no"
              : "Please enter valid policy no"}
          </Text>
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
        <DateView>
          <DateInputController
            label=" Expiry Date(DD:MM:YYYY)(Required)*"
            rules={{ required: false }}
            name="expiryDate"
            value={expiryDate ? expiryDate : null}
            readOnly={true}
            placeValue={setPlaceValue}
            divide={false}
            text={true}
            control={control}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}>
            <MaterialIcons name="date-range" size={24} color="black" />
          </TouchableOpacity>
        </DateView>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={expiryDate ? new Date(expiryDate) : new Date()}
            mode="date"
            minimumDate={minDate}
            is24Hour={true}
            display="default"
            onTouchStart={() => console.log("HE")}
            onChange={(event, selectedDate) => {
              onChange(event, selectedDate);
              setExpiryDateError(null);
            }}
          />
        )}
        {expiryDateError && (
          <Text variant="error">Please select the insurance expiry date</Text>
        )}
      </Spacer>

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
          label=" Expiry Date(MM:DD:YY)(Required)*"
          rules={{ required: true }}
          name="expiryDate"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          readOnly={false}
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
