import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components/native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useForm } from "react-hook-form";
import { IPADDRESS } from "../../../utils/env";
import { Header } from "../../../components/header/header.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
// import { Dropdown } from "react-native-material-dropdown-v2";
import { Picker } from "@react-native-picker/picker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { InputController } from "../../../components/form-control/input-control.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { toastMessage } from "../../../components/toast-message/toast.component";

const CarContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const InputeContainer = styled.View`
  margin: auto;
`;

const AddressButton = styled(Button)`
  width: 340px;
`;

// const DropdownMenu = styled(Dropdown)`
//   width: 340px;
// `;

const data = [
  {
    value: "Maruti Suzuki Baleno",
    imgUrl:
      "https://imgd.aeplcdn.com/664x374/cw/ec/37710/Maruti-Suzuki-Baleno-Right-Front-Three-Quarter-147420.jpg?wm=0&q=85",
  },
  {
    value: "Maruti Suzuki Swift",
    imgUrl:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/54399/exterior-right-front-three-quarter-10.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Ertiga",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/35211/ertiga-exterior-right-front-three-quarter-141879.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Vitara Brezza",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/39028/marutisuzuki-vitara-brezza-right-front-three-quarter3.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Dzire",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/45691/marutisuzuki-dzire-right-front-three-quarter8.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Wagon R",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/34467/wagonr-exterior-right-front-three-quarter-3.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Celerio",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/31314/celerio-exterior-right-front-three-quarter-2.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Ignis",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/44409/marutisuzuki-ignis-right-front-three-quarter3.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Ciaz",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/48542/ciaz-exterior-right-front-three-quarter-2.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Eeco",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/n/cw/ec/9710/eeco-exterior-right-front-three-quarter-14.jpeg?q=85",
  },
  {
    value: "Maruti Suzuki Alto",
    imgUrl:
      "https://imgd.aeplcdn.com/227x128/cw/ec/39013/Maruti-Suzuki-Alto-Right-Front-Three-Quarter-154833.jpg?wm=0&q=85",
  },
];
export const MyCarScreen = ({ navigation, route }) => {
  const { headerToken, user, setUser } = React.useContext(
    AuthenticationContext
  );
  const { myCar } = user;
  console.log(myCar);
  const { routeName } = route.params;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carModel, setCarModel] = useState(
    myCar ? (myCar.carModel ? myCar.carModel : null) : null
  );
  const [errorCarModel, setErrorCarModel] = useState(false);
  const [errorFuelType, setErrorFuelType] = useState(false);
  const [fuelType, setfuelType] = useState(
    myCar ? (myCar.fuelType ? myCar.fuelType : null) : null
  );
  const [fuelTypeIndex, setfuelTypeIndex] = useState(
    myCar ? (myCar.fuelType === "Diesel" ? 0 : 1) : 0
  );

  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      carModel: "",
      fuelType: "",
      registrationNo: myCar
        ? myCar.registrationNo
          ? myCar.registrationNo
          : ""
        : "",
      modelYear: myCar
        ? myCar.modelYear
          ? myCar.modelYear.toString()
          : ""
        : "",
    },
  });
  console.log(errors);
  const onSubmit = async (carData) => {
    carData.carModel = carModel;
    carData.fuelType = fuelTypeIndex;
    setErrorCarModel(false);
    setErrorFuelType(false);
    if (carModel === null) {
      setErrorCarModel(true);
    }
    if (fuelType === null) {
      setErrorFuelType(true);
    }
    if (errorCarModel || errorFuelType) {
      return;
    }
    try {
      setIsLoading(true);
      console.log("carr data", carData);
      const res = await axios({
        method: "PATCH",
        headers: { Authorization: `Bearer ${headerToken}` },
        url: `${IPADDRESS}/api/v1/users/updateMe`,
        data: {
          myCar: carData,
        },
      });
      if (res.data.status === "success") {
        setUser(res.data.data.updatedUser);
        setIsLoading(false);
        toastMessage("Car details added successfully");
        navigation.navigate(routeName);
      }
      console.log(res.data.status);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setError(e.response.data.message);
    }
  };

  let rawData = [{ value: "Petrol" }, { value: "Diesel" }];
  return (
    <SafeArea>
      <Header title="My Car" toLeft={true} navigation={navigation} />
      <CarContainer>
        <InputeContainer>
          <Spacer size="medium">
            {/* <DropdownMenu
              label="Select car Model"
              data={data}
              value={carModel}
              onChangeText={(value) => setCarModel(value)}
            /> */}
            <Text variant="label">Select car model</Text>
            <Picker
              selectedValue={carModel}
              onValueChange={(carModelValue, _carModelIndex) => {
                setCarModel(carModelValue);
              }}
            >
              {data.map((car) => (
                <Picker.Item
                  key={car.imgUrl}
                  value={car.value}
                  label={car.value}
                />
              ))}
            </Picker>
            {errorCarModel === true && (
              <Spacer position="left" size="large">
                <Text variant="error">Please select car model</Text>
              </Spacer>
            )}
          </Spacer>
          <Spacer size="small">
            {/* <DropdownMenu
              label="Fuel type"
              data={rawData}
              value={fuelType}
              onChangeText={(value) => setfuelType(value)}
            /> */}
            <Text variant="label">Fuel Type</Text>
            <SegmentedControl
              tintColor="#000000"
              backgroundColor="#FFFFFF"
              values={["Diesel", "Petrol"]}
              selectedIndex={fuelTypeIndex}
              onValueChange={(value) => {
                setfuelTypeIndex(value);
              }}
            />
            {errorFuelType === true && (
              <Spacer position="left" size="large">
                <Text variant="error">Please select fuel type</Text>
              </Spacer>
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
              placeholder="e.g KA21HA2021"
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
              label="Model Year(Required)*"
              rules={{ required: true }}
              name="modelYear"
              {...register("modelYear", { min: 1990, max: 2021 })}
              placeValue={setPlaceValue}
              divide={false}
              text={false}
              control={control}
            />
            {errors.modelYear && (
              <Text variant="error">
                {errors.modelYear.type === "required"
                  ? "Model year is required"
                  : "Model year should be > 1990 and < 2021"}
              </Text>
            )}
          </Spacer>
          {error && (
            <Spacer position="top" size="large">
              <Text variant="error">{error}</Text>
            </Spacer>
          )}
          <Spacer size="four_large">
            {!isLoading ? (
              <AddressButton mode="contained" onPress={handleSubmit(onSubmit)}>
                Save Car Details
              </AddressButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </InputeContainer>
      </CarContainer>
    </SafeArea>
  );
};
