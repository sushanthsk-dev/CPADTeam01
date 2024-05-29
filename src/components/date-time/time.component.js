import React from "react";
import styled from "styled-components";
import { Text } from "../typography/text.component";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { TimeContext } from "../../services/date-time/time.context";
import { DateContext } from "../../services/date-time/date.context";

const TimeContainer = styled.View`
  border: 2px solid ${(props) => props.theme.colors.ui.secondary};
  width: 74px;
  border-radius: 4px;
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[1]};
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const FocusTimeContainer = styled.View`
  border: 2px solid ${(props) => props.theme.colors.brand.primary};
  width: 74px;
  border-radius: 4px;
  padding: ${(props) => props.theme.space[1]};
  margin: ${(props) => props.theme.space[1]};
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TimeText = styled(Text)`
  text-align: center;
  margin: auto;
  align-items: center;
`;

export const TimeView = ({ timeData, isFocused }) => {
  return isFocused === true ? (
    <FocusTimeContainer>
      <TimeText>{timeData}</TimeText>
    </FocusTimeContainer>
  ) : (
    <TimeContainer>
      <TimeText>{timeData}</TimeText>
    </TimeContainer>
  );
};
