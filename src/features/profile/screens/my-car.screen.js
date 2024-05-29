import React, { useState } from "react";
import styled from "styled-components/native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { Header } from "../../../components/header/header.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Dropdown } from "react-native-material-dropdown-v2";
import { Spacer } from "../../../components/spacer/spacer.component";
import { InputController } from "../../../components/form-control/input-control.component";
const CarContainer = styled.View`
  margin-top: 56px;
`;
const InputeContainer = styled.View`
  margin: auto;
`;

const AddressButton = styled(Button)`
  width: 340px;
`;

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
export const MyCarScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [carModel, setCarModel] = useState(null);
  const [fuelType, setfuelType] = useState(null);
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
      regNo: "",
      modalYear: "",
    },
  });
  const onSubmit = (d) => {
    console.log(d);
    console.log(carModel, fuelType);
  };


  let rawData = [{ value: "Petrol" }, { value: "Diesel" }];
  return (
    <SafeArea>
      <Header title="My Car" toLeft={true} navigation={navigation} />
      <CarContainer>
        <Dropdown
          label="Select car Model"
          data={data}
          onChangeText={(value) => setCarModel(value)}
        />
        <Dropdown
          label="Fuel type"
          data={rawData}
          onChangeText={(value) => setfuelType(value)}
        />
        <InputeContainer>
          <Spacer size="large">
            <InputController
              label="Reg No(Required)*"
              rules={{ required: true }}
              name="regNo"
              placeValue={setPlaceValue}
              divide={false}
              text={true}
              control={control}
            />
            {errors.regNo && (
              <Text variant="error">Please enter the reg no</Text>
            )}
          </Spacer>
          <Spacer size="four_large">
            <InputController
              label="Modal Year(Required)*"
              rules={{ required: true }}
              name="modalYear"
              divide={false}
              text={false}
              control={control}
            />
            {errors.modalYear && (
              <Text variant="error">modal year is required</Text>
            )}
          </Spacer>
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
