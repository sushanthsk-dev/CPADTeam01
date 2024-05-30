import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { InputController } from "../../../components/form-control/input-control.component";
import { onChange } from "react-native-reanimated";
import { IPADDRESS } from "../../../utils/env";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { InsuranceDocumentContext } from "../../../services/documents/insurance-document.context";
import { LoadingDiv } from "../../../components/loading/loading.component";
import { EmissionDocumentContext } from "../../../services/documents/emission-document.context";
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
  const {
    createDocument,
    isLoading,
    deleteDocument,
    getDocument,
    setInsuranceDocument,
    insuranceDocument = null,
    isDeleteLoading,
  } = React.useContext(InsuranceDocumentContext);

  const [expiryDate, setExpiryDate] = useState(null);

  const [expiryDateError, setExpiryDateError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [minDate, setMinDate] = useState(null);
  // const { insuranceDocument = null } = user;
  const [isDivLoading, setIsDivLoading] = useState(true);

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
        insuranceDocument !== null
          ? insuranceDocument.insuranceCompanyName
          : "Oriental Company",
      policyNo:
        insuranceDocument !== null
          ? insuranceDocument.policyNo
          : "192939/28/2021/2222",
      registrationNo:
        insuranceDocument !== null
          ? insuranceDocument.registrationNo
          : "KA21HA2020",
      insuredName:
        insuranceDocument !== null ? insuranceDocument.insuredName : "",
    },
  });

  const onSubmit = async (data) => {
    if (!expiryDate) {
      setExpiryDateError("Please select expiryDate");
      return;
    }
    data.expiryDate = `${expiryDate} 23:59:59`;
    const res = await createDocument(data);
    if (res === "success") {
      setInsuranceDocument(await getDocument());
      navigation.goBack();
    }
  };

  const deleteConfirmAlert = () =>
    Alert.alert("Delete", "Are you sure you want delete", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteDocument(navigation) },
    ]);

  const setDateFormat = (date) => {
    const currentDate = new Date(date);
    const month =
      currentDate.getMonth() < 9
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1;
    setExpiryDate(
      `${month}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || expiryDate;
    // setShowDatePicker(Platform.OS === "ios");

    setShowDatePicker(false);
    setDateFormat(currentDate);
  };

  useEffect(() => {
    setTimeout(() => setIsDivLoading(false), 100);
    const getDoc = async () => {
      const res = await getDocument();
      setInsuranceDocument(res);
    };
    getDoc();
    const setMiniumDate = () => {
      let minDate = new Date();
      minDate.setDate(minDate.getDate() + 2);

      setMinDate(minDate);
    };
    // getDocument(headerToken, setInsurance);
    setMiniumDate();
    if (insuranceDocument !== null) setDateFormat(insuranceDocument.expiryDate);
  }, []);
  return !isDivLoading ? (
    <DocumentContainer showsVerticalScrollIndicator={false}>
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
          <DocumentButton mode="contained" onPress={handleSubmit(onSubmit)}>
            Save Insurance Details
          </DocumentButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
        {!isDeleteLoading ? (
          <DocumentButton
            mode="contained"
            onPress={deleteConfirmAlert}
            color={Colors.red900}
            disabled={insuranceDocument === null || isLoading ? true : false}
          >
            Delete Insurance Details
          </DocumentButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
      </Spacer>
    </DocumentContainer>
  ) : (
    <LoadingDiv />
  );
};

export const AddEmissionDocument = ({ emission = false, navigation }) => {
  const {
    createDocument,
    isLoading,
    deleteDocument,
    getDocument,
    setEmissionDocument,
    emissionDocument = null,
    isDeleteLoading,
  } = React.useContext(EmissionDocumentContext);

  const [expiryDate, setExpiryDate] = useState(null);

  const [expiryDateError, setExpiryDateError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [minDate, setMinDate] = useState(null);
  // const { emissionDocument = null } = user;
  const [isDivLoading, setIsDivLoading] = useState(true);

  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registrationNo:
        emissionDocument !== null
          ? emissionDocument.registrationNo
          : "KA21HA2021",
      puucNo: emissionDocument !== null ? emissionDocument.puucNo : "43666326",
      customerName:
        emissionDocument !== null ? emissionDocument.customerName : "Virat",
      expiryDate: emissionDocument !== null ? emissionDocument.expiryDate : "",
    },
  });

  const onSubmit = async (data) => {
    if (!expiryDate) {
      setExpiryDateError("Please select expiryDate");
      return;
    }
    data.expiryDate = `${expiryDate} 23:59:59`;
    const res = await createDocument(data);
    if (res === "success") {
      setEmissionDocument(await getDocument());
      navigation.goBack();
    }
  };

  const deleteConfirmAlert = () =>
    Alert.alert("Delete", "Are you sure you want delete", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteDocument(navigation) },
    ]);

  const setDateFormat = (date) => {
    const currentDate = new Date(date);
    const month =
      currentDate.getMonth() < 9
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1;
    setExpiryDate(
      `${month}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || expiryDate;
    // setShowDatePicker(Platform.OS === "ios");

    setShowDatePicker(false);
    setDateFormat(currentDate);
  };

  useEffect(() => {
    setTimeout(() => setIsDivLoading(false), 100);
    const getDoc = async () => {
      const res = await getDocument();
      setEmissionDocument(res);
    };
    getDoc();
    const setMiniumDate = () => {
      let minDate = new Date();
      minDate.setDate(minDate.getDate() + 2);

      setMinDate(minDate);
    };
    // getDocument(headerToken, setEmission);
    setMiniumDate();
    if (emissionDocument !== null) setDateFormat(emissionDocument.expiryDate);
  }, []);

  return !isDivLoading ? (
    <DocumentContainer>
      <Spacer size="large">
        <InputController
          label="Vehicle Reg No(Required)*"
          rules={{ required: true }}
          name="registrationNo"
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
        {errors.customerName && (
          <Text variant="error">Please enter the customer's name</Text>
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
          <Text variant="error">Please select the emission expiry date</Text>
        )}
      </Spacer>

      <Spacer size="medium">
        {!isLoading ? (
          <DocumentButton mode="contained" onPress={handleSubmit(onSubmit)}>
            Save emission details
          </DocumentButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
        {!isDeleteLoading ? (
          <DocumentButton
            mode="contained"
            onPress={deleteConfirmAlert}
            color={Colors.red900}
            disabled={emissionDocument === null || isLoading ? true : false}
          >
            Delete emission details
          </DocumentButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.blue300} />
        )}
      </Spacer>
    </DocumentContainer>
  ) : (
    <LoadingDiv />
  );
};
