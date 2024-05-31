import React from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  s_small: -1,
  m_medium: -2,
  larger: 6,
  four_large: 4,
  l_larger: 5,
};

const positionVariant = {
  top: "margin-top",
  left: "margin-left",
  right: "margin-right",
  bottom: "margin-bottom",
};
const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const positionVal = positionVariant[position];
  let space = sizeIndex === -1 ? "2px" : "5px";
  const value =
    sizeIndex === -1 || sizeIndex === -2 ? space : theme.space[sizeIndex];
  return `${positionVal}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant}
`;
export const Spacer = ({ position = "top", size = "small", children }) => {
  const theme = useTheme();
  if (position === "none") {
    return <View>{children}</View>;
  }
  const variant = getVariant(position, size, theme);

  return <SpacerView variant={variant}>{children}</SpacerView>;
};
