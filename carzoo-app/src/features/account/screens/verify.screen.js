import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
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
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled.View`
  width: 100%;
`;
export const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(null);
  const [codeError, setCodeError] = useState(null);
  const { isLoading, error, verifyResetToken, setError } = useContext(
    AuthenticationContext
  );
  const { email, role } = route.params;

  const onSubmit = async () => {
    if (code === null) {
      setCodeError("Please enter the code");
      return;
    }
    if (code.length < 6) {
      setCodeError("Please enter the 5 digit code");
      return;
    }

    const res = await verifyResetToken(code, email, role);
    if (res) {
      if (res.status === "success") {
        setError(null);
        navigation.navigate("ResetPasswordScren", {
          code: res.token,
          role: role,
        });
      }
    }
  };

  React.useEffect(() => {
    () => setError(null);
  }, []);
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
          <Text variant="body">
            Please enter the 5 digit code sent to your email address
          </Text>
          <Spacer position="top" size="medium" />
          <AuthInput
            label="Code"
            value={code}
            mode="outlined"
            keyboardType="numeric"
            textContentType="oneTimeCode"
            onChangeText={(c) => setCode(c)}
            maxLength={6}
          />
          {error && (
            <Spacer position="top" size="large">
              <Text variant="error">{error}</Text>
            </Spacer>
          )}
          {codeError && (
            <Spacer position="top" size="large">
              <Text variant="error">{codeError}</Text>
            </Spacer>
          )}
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
