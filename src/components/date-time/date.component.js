import React from "react";
import styled from "styled-components";
import { Text } from "../typography/text.component";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { DateContext } from "../../services/date-time/date.context";

const DateContainer = styled.View`
  border: 2px solid ${(props) => props.theme.colors.ui.secondary};
  width: 54px;
  border-radius: 4px;
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[2]};
  align-items: center;
`;
const FocusDateContainer = styled.View`
  border: 2px solid ${(props) => props.theme.colors.brand.primary};
  width: 54px;
  border-radius: 4px;
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[2]};
  align-items: center;
`;

export const DateView = ({ dateData, isFocused }) => {
  const dateArray = dateData.split(" ");
  return isFocused === true ? (
    <FocusDateContainer>
      <Text variant="label">{dateArray[2]}</Text>
      <Text>{dateArray[0]}</Text>
    </FocusDateContainer>
  ) : (
    <DateContainer>
      <Text variant="label">{dateArray[2]}</Text>
      <Text>{dateArray[0]}</Text>
    </DateContainer>
  );
};
