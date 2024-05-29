import React from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";

const AddressCardContainer = styled.View`
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
  address.address = "Hello WOrld";
  address.city = "moodbidri";
  address.pincode = "574227";
  address.state = "Karnataka";
  address.phoneno = "9876543210";
  return (
    <AddressCardContainer>
      {!!edit && (
        <EditButton>
          <EvilIcons
            name="pencil"
            size={28}
            color="green"
            onPress={() => navigation.navigate("MechanicAddressScreen")}
          />
        </EditButton>
      )}
      <Spacer position="bottom">
        <Text variant="checkoutTitle">Virat</Text>
      </Spacer>
      <Text>{address.address.trim()}</Text>
      <Text>{`${address.city} ${address.pincode}, ${address.state}`}</Text>
      <Spacer position="top">
        <Phoneno>
          <Text variant="subHead">Phone no: </Text>
          <Text variant="body">{address.phoneno}</Text>
        </Phoneno>
      </Spacer>
    </AddressCardContainer>
  );
};
