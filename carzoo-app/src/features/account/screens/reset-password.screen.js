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
} from "../components/account.styles";

const SignInContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

export const ResetPasswordScren = ({ navigation, route }) => {
  const { code, role } = route.params;
  const [password, setPassword] = useState("test1234");
  const [repeatedPassword, setRepeatedPassword] = useState("test1234");
  const { resetPassword, isLoading, error, setError } = useContext(
    AuthenticationContext
  );

  const onResetPassword = async () => {
    await resetPassword(code, role, password, repeatedPassword);
  };

  React.useEffect(() => {
    () => setError(null);
  }, []);

  return (
    <SafeArea>
      <Header title="Reset Password" toLeft={true} navigation={navigation} />

      <ChangePasswordBackground>
        <AccountContainer>
          <Spacer position="left" size="small">
            <Text variant="title">Please reset your password</Text>
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
            <Spacer position="top" size="large">
              <ErrorContainer>
                <Text variant="error">{`${
                  error.includes("minimum")
                    ? "Password should contain atleast 8 characters"
                    : error
                }`}</Text>
              </ErrorContainer>
            </Spacer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton mode="contained" onPress={onResetPassword}>
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
