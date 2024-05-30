import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
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
  ErrorContainer,
  LogoImageContainer,
  LinkText,
} from "../components/account.styles";
import { TouchableWithoutFeedback } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AuthInputController } from "../../../components/form-control/auth-input-controller";
export const AdminLoginScreen = ({ navigation }) => {
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "test1234",
    },
  });
  // const [email, setEmail] = useState("admin@gmail.com");
  // const [emailError, setEmailError] = useState(null);
  // const [passwordError, setPasswordError] = useState(null);
  const [oldPassword, setOldPassword] = useState("test1234");
  const isAdmin = true;
  const { onLogin, isLoading, error, response, setError } = useContext(
    AuthenticationContext
  );

  const onLoginSubmit = ({ email, password }) => {
    setError(null);
    setOldPassword(password);
    onLogin(email, password, isAdmin);
  };

  useEffect(() => {
    if (response !== null) {
      navigation.navigate("ChangePasswordScreen", {
        oldPassword: oldPassword,
        id: response.id,
      });
    }
  }, [response]);

  useEffect(() => {
    setError(null);
  }, [handleSubmit]);
  return (
    <AccountBackground>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <Text variant="title">Admin Login</Text>
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
            onPress={() => {
              setError(null);
              navigation.navigate("ForgotPasswordScreen", { role: "admin" });
            }}
          >
            <LinkText variant="body">Forget Password?</LinkText>
          </TouchableWithoutFeedback>
        </ForgotPasswordContainer>
      </AccountContainer>
      <Spacer>
        <TouchableWithoutFeedback
          onPress={() => {
            setError(null);
            navigation.navigate("LoginScreen");
          }}
        >
          <LinkText variant="body">User Login</LinkText>
        </TouchableWithoutFeedback>
      </Spacer>
    </AccountBackground>
  );
};
