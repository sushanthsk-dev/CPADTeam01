import React from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";

const CardContainer = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding: ${(props) => props.theme.space[3]};
  margin: ${(props) => props.theme.space[1]};
  border-radius: 4px;
`;

const EditButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 666;
`;

const Phoneno = styled.View`
  flex-direction: row;
`;

export const AddressCard = ({ navigation, address = {}, edit = true }) => {

  return (
    <CardContainer>
      {!!edit && (
        <EditButton>
          <EvilIcons
            name="pencil"
            size={28}
            color="green"
            onPress={() => navigation.navigate("AddressScreen")}
          />
        </EditButton>
      )}
      <Spacer position="bottom">
        <Text variant="checkoutTitle">{address.name}</Text>
      </Spacer>
      <Text>{address.address.trim()}</Text>
      <Text>{`${address.city} ${address.pincode}, ${address.state}`}</Text>
      <Spacer position="top">
        <Phoneno>
          <Text variant="subHead">Phone no: </Text>
          <Text variant="body">{address.phoneno}</Text>
        </Phoneno>
      </Spacer>
    </CardContainer>
  );
};

export const PickupDateTimeCard = ({ pickupDateTime }) => {
  const { from, to } = pickupDateTime;
  const fromDate = new Date(from);
  console.log(fromDate);
  const toDate = new Date(from);
  const convertTime = (time) => {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join("");
  };
  const timeArray = [
    "9-10AM",
    "10-11AM",
    "11-12PM",
    "12-1PM",
    "2-3PM",
    "3-4PM",
  ];
  // 10:00:20 AM
  // 10,00,20 AM
  const fromTime = convertTime(fromDate.toLocaleTimeString());
  return (
    <CardContainer>
      <Text variant="body">
        {`${fromDate.toDateString()}  ${timeArray.filter(
          (t) => t.split("-")[0] === fromTime.split(":")[0]
        )}`}
      </Text>
    </CardContainer>
  );
};
