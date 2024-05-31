import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "./text.component";

export const PriceText = ({ price }) => {
  return (
    <Text variant="title">
      <FontAwesome name="rupee" size={18} color="black" />
      {` ${price}`}
    </Text>
  );
};
