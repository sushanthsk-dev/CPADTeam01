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
import { toastMessage } from "../../../components/toast-message/toast.component";
const DocumentContainer = styled(ScrollView)`
  margin-top: 60px;
  padding-top: 10px;
  height: 100%;
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
    setError,
    error,
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
    setError(null);
    if (!expiryDate) {
      setExpiryDateError("Please select expiryDate");
      return;
    }
    data.expiryDate = `${expiryDate} 23:59:00`;
    const res = await createDocument(data);
    if (res === "success") {
      insuranceDocument === null
        ? toastMessage("Insurance document created successfully")
        : toastMessage("Insurance document updated successfully");
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
      currentDate.getMonth() <= 9
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1;

    const day =
      currentDate.getDate() <= 9
        ? `0${currentDate.getDate()}`
        : currentDate.getDate();
    setExpiryDate(`${month}/${day}/${currentDate.getFullYear()}`);
  };

  const onChange = (event, selectedDate) => {
    console.log("Selected", selectedDate);
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
      let min = new Date();
      min.setDate(min.getDate() + 2);

      setMinDate(min);
    };
    // getDocument(headerToken, setInsurance);
    setMiniumDate();
    if (insuranceDocument !== null) {
      const d = new Date(insuranceDocument.expiryDate);
      // d.setDate(d.getDate() - 1);
      setDateFormat(d);
    }
    () => setError(null);
  }, []);
  return !isDivLoading ? (
    <DocumentContainer showsVerticalScrollIndicator={false}>
      <Spacer size="large">
        <InputController
          label="Insurance Company Name(Required)*"
          rules={{ required: true, pattern: /^[a-zA-Z0-9_ ]*$/ }}
          name="insuranceCompanyName"
          placeholder="Oriental"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.insuranceCompanyName && (
          <Text variant="error">
            {errors.insuranceCompanyName.type
              ? "Please enter the insurance company name"
              : "Please enter the correct insurance company name"}
          </Text>
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
          placeholder="KA20HA2021"
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
          placeholder="e.g 192939/28/2021/2222"
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
      <Spacer>
        <InputController
          label="Insured's name(Required)*"
          rules={{ required: true, pattern: /^[a-zA-Z_ ]*$/ }}
          name="insuredName"
          placeholder="e.g Virat"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.insuredName && (
          <Text variant="error">
            {errors.insuredName.type === "required"
              ? "Please enter the insurred's name"
              : "Please enter only alphabet letters"}
          </Text>
        )}
      </Spacer>
      <Spacer size="large">
        <DateView>
          <DateInputController
            label=" Expiry Date(MM:DD:YYYY)(Required)*"
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
      {error && (
        <Spacer position="top" size="large">
          <Text variant="error">{`${error.split(".")[0]}.`}</Text>
          <Text variant="error">{`${error.split(".")[1]}`}</Text>
        </Spacer>
      )}
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
    error,
    setError,
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
      puucNo: emissionDocument !== null ? emissionDocument.puucNo : "P43666326",
      customerName:
        emissionDocument !== null ? emissionDocument.customerName : "Virat",
      expiryDate: emissionDocument !== null ? emissionDocument.expiryDate : "",
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    if (!expiryDate) {
      setExpiryDateError("Please select expiryDate");
      return;
    }
    data.expiryDate = `${expiryDate} 23:58:00`;
    const res = await createDocument(data);
    if (res === "success") {
      emissionDocument === null
        ? toastMessage("Emission document created successfully")
        : toastMessage("Emission document updated successfully");
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
    console.log("SET", date);
    const currentDate = new Date(date);
    const month =
      currentDate.getMonth() < 9
        ? `0${currentDate.getMonth() + 1}`
        : currentDate.getMonth() + 1;
    const day =
      currentDate.getDate() < 9
        ? `0${currentDate.getDate()}`
        : currentDate.getDate();
    setExpiryDate(`${month}/${day}/${currentDate.getFullYear()}`);
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
      let min = new Date();
      min.setDate(min.getDate() + 2);

      setMinDate(min);
    };
    // getDocument(headerToken, setEmission);
    setMiniumDate();
    if (emissionDocument !== null) {
      const d = new Date(emissionDocument.expiryDate);
      // d.setDate(d.getDate() - 1);
      setDateFormat(d);
    }
    () => setError(null);
  }, []);

  return !isDivLoading ? (
    <DocumentContainer>
      <Spacer size="large">
        <InputController
          label="Vehicle Reg No(Required)*"
          placeholder="e.g KA21HA2021"
          rules={{ required: true }}
          name="registrationNo"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.regNo && (
          <Text variant="error">
            {errors.regNo.type === "required"
              ? "Please enter the reg no"
              : "Please enter valid registration no"}
          </Text>
        )}
      </Spacer>
      <Spacer size="large">
        <InputController
          label="PUUC No(Required)*"
          rules={{ required: true, pattern: /^[a-z0-9]+$/i }}
          name="puucNo"
          placeholder="e.g P43666326"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.puucNo && (
          <Text variant="error">
            {errors.puucNo.type === "required"
              ? "Please enter the puuc number"
              : "Please enter a valid puuc NO"}
          </Text>
        )}
      </Spacer>
      <Spacer size="larger">
        <InputController
          label="Customer name(Required)*"
          rules={{ required: true, pattern: /^[a-zA-Z_ ]*$/ }}
          name="customerName"
          placeholder="e.g Virat"
          placeValue={setPlaceValue}
          divide={false}
          text={true}
          control={control}
        />
        {errors.customerName && (
          <Text variant="error">
            {errors.customerName.type === "required"
              ? "Please enter the customer name"
              : "Please enter only alphabet letters"}
          </Text>
        )}
      </Spacer>
      <Spacer size="large">
        <DateView>
          <DateInputController
            label=" Expiry Date(MM:DD:YYYY)(Required)*"
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
      {error && (
        <Spacer position="top" size="large">
          <Text variant="error">{`${error.split(".")[0]}.`}</Text>
          <Text variant="error">{`${error.split(".")[1]}`}</Text>
        </Spacer>
      )}
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
