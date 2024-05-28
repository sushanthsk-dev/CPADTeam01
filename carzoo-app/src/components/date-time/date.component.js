import React from "react";
import styled from "styled-components";
import { Text } from "../typography/text.component";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { DateContext } from "../../services/date-time/dateTime.context";

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
// const DateText = styled.(Text)`

// `;
export const DateView = ({ dateData }) => {
  const { date, addDate, removeDate } = React.useContext(DateContext);
  const isFocused = dateData.id === date.id ? true : false;
  console.log(isFocused);
  console.log(date);
  return (
    <TouchableOpacity
      onPress={() => (!isFocused ? addDate(dateData) : removeDate(dateData))}
    >
      {isFocused === true ? (
        <FocusDateContainer>
          <Text variant="label">{dateData.dateDay}</Text>
          <Text>{dateData.weekDay}</Text>
        </FocusDateContainer>
      ) : (
        <DateContainer>
          <Text variant="label">{dateData.dateDay}</Text>
          <Text>{dateData.weekDay}</Text>
        </DateContainer>
      )}
    </TouchableOpacity>
  );
};
