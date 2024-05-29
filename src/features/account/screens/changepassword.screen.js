import React, { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import {
  AccountBackground,
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

export const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [repeatedpassword, setRepeatedPassword] = useState("");
  // const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  const error = false;
  const isLoading = false;

  const onChangePassword = () => {};

  return (
    <SafeArea>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large" />
          <Ionicons name="arrow-back" size={30} color="grey" />
        </Spacer>
      </TouchableOpacity>
      <AccountBackground>
        <Text variant="title">Reset Password</Text>
        <AccountContainer>
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
              value={repeatedpassword}
              textContentType="password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(p) => setRepeatedPassword(p)}
            />
          </Spacer>
          {error && (
            <Spacer size="large">
              <ErrorContainer>
                <Text variant="error">{error.split(": ")[1]}</Text>
              </ErrorContainer>
            </Spacer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton
                mode="contained"
                onPress={() =>
                  onChangePassword(email, password, repeatedpassword)
                }
              >
                Update Password
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </AccountContainer>
      </AccountBackground>
    </SafeArea>
  );
};
