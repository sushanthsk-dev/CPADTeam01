import React, { useState } from "react";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  Colors,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  AccountContainer,
  AuthButton,
  AuthInput,
  LinkText,
} from "../components/account.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  width: 100%;
`;
export const ForgotPasswordScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = () => {};
  return (
    <SafeArea>
      <Container>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Spacer position="left" size="medium">
            <Spacer position="top" size="large" />
            <Ionicons name="arrow-back" size={30} color="grey" />
          </Spacer>
        </TouchableOpacity>
        <AccountContainer>
          <Spacer position="top" size="medium" />
          <Text variant="body">Please enter your email address</Text>
          <Spacer position="top" size="medium" />
          <AuthInput
            label="Code"
            value={code}
            mode="outlined"
            keyboardType="numeric"
            textContentType="oneTimeCode"
            onChangeText={(c) => setCode(c)}
            maxLength={5}
          />
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton mode="contained" onPress={() => onSubmit()}>
                Verify
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
          <Spacer size="large">
            <TouchableWithoutFeedback onPress={() => console.log("Hello")}>
              <LinkText variant="body">Resend Code</LinkText>
            </TouchableWithoutFeedback>
          </Spacer>
        </AccountContainer>
      </Container>
    </SafeArea>
  );
};
