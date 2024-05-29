import React, { useState, useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const ForgotPasswordContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
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
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
export const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("agent7@gmail.com");
  const [password, setPassword] = useState("test1234");
  const isAdmin = true;
  const { onLogin, isLoading, error, response, setError } = useContext(
    AuthenticationContext
  );
  useEffect(() => {
    console.log(response);
    if (response !== null) {
      navigation.navigate("ChangePassword", {
        oldPassword: password,
        id: response.id,
      });
    }
  }, [response]);
  return (
    <AccountBackground>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <Text variant="title">Admin Login</Text>
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
              onPress={() => onLogin(email, password, isAdmin)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
        <ForgotPasswordContainer>
          <TouchableWithoutFeedback onPress={() => console.log("Forget")}>
            <LinkText variant="body">Forget Password?</LinkText>
          </TouchableWithoutFeedback>
        </ForgotPasswordContainer>
      </AccountContainer>
      <Spacer>
        <TouchableWithoutFeedback
          onPress={() => {
            setError(null);
            navigation.navigate("Login");
          }}
        >
          <LinkText variant="body">User Login</LinkText>
        </TouchableWithoutFeedback>
      </Spacer>
    </AccountBackground>
  );
};
