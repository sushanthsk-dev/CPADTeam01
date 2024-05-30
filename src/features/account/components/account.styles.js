import styled from "styled-components/native";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";

export const LogoImageContainer = styled.Image`
  width: 241px;
  height: 50px;
  transform: scale(0.7);
  justify-content: center;
  margin: 0 auto;
`;

export const ChangePasswordBackground = styled.View`
  flex: 1;
  justify-content: center;
`;

export const AccountBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const RegisterAccountContainer = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
`;
export const AccountContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
  width: 100%;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const LinkText = styled(Text)`
  color: ${(props) => props.theme.colors.brand.secondary};
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;
