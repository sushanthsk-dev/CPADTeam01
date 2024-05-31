import React from "react";

import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const BlankScreen = styled.View`
  flex: 1;
`;

export const LoadingDiv = ({ noLoading }) => {
  return noLoading !== true ? (
    <LoadingContainer>
      <Loading size={50} animating={true} color={Colors.blue300} />
    </LoadingContainer>
  ) : (
    <BlankScreen />
  );
};
