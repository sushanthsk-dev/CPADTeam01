import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const ForgotPasswordContainer = styled.View`
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
import { AuthInputController } from "../../../components/form-control/auth-input-controller";
import { NetworkContext } from "../../../services/internetConnectionCheck/internet-network.context";
import { NoInternetErrorScreen } from "../../gps-map-error/no-internet-connection";
export const LoginScreen = ({ navigation }) => {
  const { onLogin, isLoading, error, setError } = useContext(
    AuthenticationContext
  );
  const context = useContext(NetworkContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "kyle@gmail.com",
      password: "test1234",
    },
  });

  const onLoginSubmit = ({ email, password }) => {
    onLogin(email, password);
  };
  React.useEffect(() => {
    () => setError(null);
  }, []);
  useEffect(() => {
    setError(null);
    () => setError(null);
  }, [handleSubmit]);
  return (
    <AccountBackground>
      {context.isConnected && (
        <NoInternetErrorScreen show={true} navigation={navigation} />
      )}
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <AccountContainer>
        <Spacer size="larger">
          <AuthInputController
            label="Email"
            rules={{
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }}
            name="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            modeStyle="contained"
          />
          {errors.email && (
            <Text variant="error">
              {errors.email.type === "required"
                ? "Please enter the email address"
                : "Please enter valid email address"}
            </Text>
          )}
        </Spacer>
        <Spacer />
        <Spacer size="larger">
          <AuthInputController
            label="Password"
            rules={{ required: true }}
            name="password"
            control={control}
            textContentType="password"
            secureTextEntry={true}
            autoCapitalize="none"
            modeStyle="contained"
          />
          {errors.password && (
            <Text variant="error">Please enter password</Text>
          )}
        </Spacer>
        {error && (
          <Spacer size="large">
            <ErrorContainer>
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          </Spacer>
        )}
        <Spacer />
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={handleSubmit(onLoginSubmit)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
        <ForgotPasswordContainer>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("ForgotPasswordScreen", { role: "users" })
            }
          >
            <LinkText variant="body">Forget Password?</LinkText>
          </TouchableWithoutFeedback>
        </ForgotPasswordContainer>
        <SignUpContainer>
          <Text>Don't have account? </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setError(null);
              navigation.navigate("RegisterScreen");
            }}
          >
            <LinkText variant="body">Sign up</LinkText>
          </TouchableWithoutFeedback>
        </SignUpContainer>
      </AccountContainer>
      <Spacer>
        <TouchableWithoutFeedback
          onPress={() => {
            setError(null);
            navigation.navigate("AdminLoginScreen");
          }}
        >
          <LinkText variant="body">Admin Login</LinkText>
        </TouchableWithoutFeedback>
      </Spacer>
    </AccountBackground>
  );
};
