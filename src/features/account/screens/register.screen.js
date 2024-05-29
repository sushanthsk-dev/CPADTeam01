import React, { useState, useContext } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
  LinkText,
  LogoImageContainer,
  Title,
} from "../components/account.styles";

const SignInContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatedpassword, setRepeatedPassword] = useState("");
  // const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  const error = false;
  const isLoading = false;
  return (
    <AccountBackground>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <AccountContainer>
        <AuthInput
          label="Name"
          value={name}
          textContentType="name"
          onChangeText={(n) => setName(n)}
        />
        <Spacer size="large">
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
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedpassword)}
            >
              Register
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
        <SignInContainer>
          <Text>Already have an account? </Text>
          <TouchableWithoutFeedback onPress={() => console.log("Wow")}>
            <LinkText variant="body">Sign in</LinkText>
          </TouchableWithoutFeedback>
        </SignInContainer>
      </AccountContainer>
    </AccountBackground>
  );
};
