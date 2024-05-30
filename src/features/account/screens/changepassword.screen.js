import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { AuthInputController } from "../../../components/form-control/auth-input-controller";
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
  const { onPasswordChange, isLoading, error, setError } = useContext(
    AuthenticationContext
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      repeatedPassword: "",
    },
  });
  const onChangePassword = ({ password, repeatedPassword }) => {
    onPasswordChange(oldPassword, password, repeatedPassword, id);
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
            <Text variant="title">Please Change your password</Text>
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
            <Spacer size="large">
              <ErrorContainer>
                <Text variant="error">{error}</Text>
              </ErrorContainer>
            </Spacer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton
                mode="contained"
                onPress={handleSubmit(onChangePassword)}
              >
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
