import React, { useState, useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ForgotPasswordContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.space[3]};
`;
const SignUpContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  LogoImageContainer,
  LinkText,
} from "../components/account.styles";
import { TouchableWithoutFeedback } from "react-native";
export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("Kyle@gmail.com");
  const [password, setPassword] = useState("test1234");
  const { onLogin, isLoading, error, setError } = useContext(
    AuthenticationContext
  );

  return (
    <AccountBackground>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <AccountContainer>
        <Spacer>
          <AuthInput
            label="Email"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
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
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
        <ForgotPasswordContainer>
          <TouchableWithoutFeedback onPress={() => console.log("Hello")}>
            <LinkText variant="body">Forget Password?</LinkText>
          </TouchableWithoutFeedback>
        </ForgotPasswordContainer>
        <SignUpContainer>
          <Text>Don't have account? </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Register")}
          >
            <LinkText variant="body">Sign up</LinkText>
          </TouchableWithoutFeedback>
        </SignUpContainer>
      </AccountContainer>
      <Spacer>
        <TouchableWithoutFeedback
          onPress={() => {
            setError(null);
            navigation.navigate("AdminLogin");
          }}
        >
          <LinkText variant="body">Admin Login</LinkText>
        </TouchableWithoutFeedback>
      </Spacer>
    </AccountBackground>
  );
};
