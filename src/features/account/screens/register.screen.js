import React, { useState, useContext } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { AuthInputController } from "../../../components/form-control/auth-input-controller";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

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
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
  });
  const { onRegister, isLoading, error, setError } = useContext(
    AuthenticationContext
  );

  const onSubmit = ({ name, email, password, repeatedPassword }) => {
    if (password !== repeatedPassword) {
      setError("Passwords are not same");
      return;
    }
    onRegister(name, email, password, repeatedPassword);
  };

  React.useEffect(() => {
    () => setError(null);
  }, []);

  React.useEffect(() => {
    setError(null);
  }, [handleSubmit]);

  return (
    <AccountBackground>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <RegisterAccountContainer>
        <Spacer size="larger">
          <AuthInputController
            label="Name"
            rules={{
              required: true,
              pattern: /^[a-zA-Z_ ]*$/,
            }}
            name="name"
            control={control}
            modeStyle="contained"
          />
          {errors.name && (
            <Text variant="error">
              {errors.name.type === "required"
                ? "Please enter the name"
                : "Please enter only alphabet letters"}
            </Text>
          )}
        </Spacer>
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
        <Spacer size="larger">
          <AuthInputController
            label="Confirm password"
            rules={{ required: true }}
            name="repeatedPassword"
            control={control}
            textContentType="password"
            secureTextEntry={true}
            autoCapitalize="none"
            modeStyle="contained"
          />
          {errors.repeatedPassword && (
            <Text variant="error">Please enter confirm password</Text>
          )}
        </Spacer>
        {error && (
          <Spacer size="medium">
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
              onPress={handleSubmit(onSubmit)}
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
            onPress={() => {
              setError(null);
              navigation.navigate("LoginScreen");
            }}
          >
            <LinkText variant="body">Sign in</LinkText>
          </TouchableWithoutFeedback>
        </SignInContainer>
      </RegisterAccountContainer>
    </AccountBackground>
  );
};
