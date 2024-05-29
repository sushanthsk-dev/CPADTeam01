import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import {
  ChangePasswordBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
  LogoImageContainer,
} from "../components/account.styles";

const SignInContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

export const ChangePasswordScreen = ({ navigation, route }) => {
  const { oldPassword, id } = route.params;
  const [password, setPassword] = useState("test1234");
  const [repeatedPassword, setRepeatedPassword] = useState("test1234");
  const { onPasswordChange, isLoading, error } = useContext(
    AuthenticationContext
  );

  const onChangePassword = () => {
    onPasswordChange(oldPassword, password, repeatedPassword, id);
  };

  return (
    <SafeArea>
      <Header title="Reset Password" toLeft={true} navigation={navigation} />

      <ChangePasswordBackground>
        <AccountContainer>
          <Spacer position="left" size="small">
            <Text variant="title">Please Change your password</Text>
          </Spacer>
          <Spacer size="large">
            <AuthInput
              label="Password"
              value={password}
              textContentType="password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(p) => setPassword(p)}
            />
          </Spacer>
          <Spacer size="large">
            <AuthInput
              label="Repeat Password"
              value={repeatedPassword}
              textContentType="password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(p) => setRepeatedPassword(p)}
            />
          </Spacer>
          {error && (
            <Spacer size="large">
              <ErrorContainer>
                <Text variant="error">{error}</Text>
              </ErrorContainer>
            </Spacer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton mode="contained" onPress={onChangePassword}>
                Update Password
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </AccountContainer>
      </ChangePasswordBackground>
    </SafeArea>
  );
};
