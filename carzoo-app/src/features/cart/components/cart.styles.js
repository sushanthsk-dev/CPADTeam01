import { Button } from "react-native-paper";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

export const CommonButton = styled(Button).attrs({
  color: colors.bg.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.brand.primary};
`;
