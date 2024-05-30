import React, { useState, useContext } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import validate from "validate.js";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";
const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
  LinkText,
  LogoImageContainer,
  RegisterAccountContainer,
  Title,
} from "../components/account.styles";
import { ForgotPasswordContainer } from "./login.screen";

const SignInContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [repeatedpassword, setRepeatedPassword] = useState(null);
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);
  const onSubmit = () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmError(null);
    setNameError(name === null ? "Please enter a name" : null);
    setEmailError(email === null ? "Please enter a email" : null);
    setPasswordError(password === null ? "Please enter a password" : null);
    setPasswordConfirmError(
      !repeatedpassword ? "Please enter a confirm password" : null
    );

    if (email !== null && !re.test(String(email).toLowerCase())) {
      setEmailError("Please enter a valid email address");

      return;
    }
    if (password !== null && password.length <= 7) {
      setPasswordError("Minimum 8 character required");
      return;
    }
    if (!name || !email || !password || !repeatedpassword) {
      return;
    }
    onRegister(name, email, password, repeatedpassword);
  };

  return (
    <AccountBackground>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <RegisterAccountContainer>
        <Spacer>
          <AuthInput
            label="Name"
            value={name}
            textContentType="name"
            onChangeText={(n) => setName(n)}
          />
          {nameError && <Text variant="error">{nameError}</Text>}
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Email"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
          {emailError && <Text variant="error">{emailError}</Text>}
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
          {passwordError && <Text variant="error">{passwordError}</Text>}
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Confirm Password"
            value={repeatedpassword}
            textContentType="password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
          {passwordConfirmError && (
            <Text variant="error">{passwordConfirmError}</Text>
          )}
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
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={onSubmit}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
        <SignInContainer>
          <Text>Already have an account? </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Login")}
          >
            <LinkText variant="body">Sign in</LinkText>
          </TouchableWithoutFeedback>
        </SignInContainer>
      </RegisterAccountContainer>
    </AccountBackground>
  );
};
