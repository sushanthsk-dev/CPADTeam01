import React from "react";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";

const HeaderContainer = styled.View`
  position: relative;
  width: 100%;
  z-index: 1111;
  height: 56px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.toLeft === true ? "flex-start" : "center"};
`;
const HeaderText = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.bg.primary};
`;
export const Header = ({
  title = "",
  toLeft = false,
  topNavigate = false,
  navigation,
}) => {
  return (
    <HeaderContainer toLeft={toLeft}>
      {!!toLeft && (
        <TouchableOpacity
          onPress={() =>
            topNavigate ? navigation.popToTop() : navigation.goBack()
          }
        >
          <Spacer position="left" size="large">
            <Ionicons name="arrow-back" size={30} color="white" />
          </Spacer>
        </TouchableOpacity>
      )}
      <Spacer position={toLeft === true ? "left" : "none"} size="large">
        <HeaderText>{title}</HeaderText>
      </Spacer>
    </HeaderContainer>
  );
};
