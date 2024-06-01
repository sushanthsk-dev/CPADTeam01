import { StatusBar, SafeAreaView, Platform } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${Platform.OS === "android" ? "40px" : "0px"}
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
