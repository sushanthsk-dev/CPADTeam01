import React from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

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
export const AddressCard = ({ navigation, address }) => {
  return (
    <AddressCardContainer>
      <EditButton>
        <EvilIcons
          name="pencil"
          size={28}
          color="green"
          onPress={() => navigation.navigate("AddressScreen")}
        />
      </EditButton>
      <Text>{address.address.trim()}</Text>
      <Text>{`${address.city} ${address.pincode}, ${address.state}`}</Text>
    </AddressCardContainer>
  );
};
