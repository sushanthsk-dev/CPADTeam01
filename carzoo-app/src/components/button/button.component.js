import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export const PrimaryButton = styled(TouchableOpacity)`
  position: absolute;
  right:0;
  margin-right:-8px;
  background-color:${(props) => props.theme.colors.brand.primary}
  top:20px;
  padding: ${(props) => props.theme.space[2]};
  z-index: 777;
  border-radius:5px;
`;

//.attrs({
//   color: colors.text.inverse,
// })
