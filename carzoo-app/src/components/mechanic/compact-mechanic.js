import React from "react";
import styled from "styled-components";
import WebView from "react-native-webview";
import { Platform, TouchableOpacity } from "react-native";
import { Text } from "../typography/text.component";

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 80px;
  height: 80px;
`;
const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 80px;
  height: 80px;
`;
const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";
export const CompactMechanicInfo = ({ mechanic, isMap }) => {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;
  const { photo = "default.jpg" } = mechanic;
  console.log(photo);
  return (
    <Item>
      <Image
        source={{
          uri: `https://carzoo21.s3.amazonaws.com/default.jpg`,
        }}
      />
      <Text center variant="caption" numberOfLines={3}>
        {mechanic.name}
      </Text>
    </Item>
  );
};
