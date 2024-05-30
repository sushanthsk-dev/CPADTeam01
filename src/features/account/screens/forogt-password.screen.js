import React, { useState, useContext } from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
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
import { toastMessage } from "../../../components/toast-message/toast.component";

const Container = styled.View`
  width: 100%;
`;
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const ForgotPasswordScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const { role } = route.params;
  const { isLoading, error, forgotPassword, setError } = useContext(
    AuthenticationContext
  );

  const onSubmit = async () => {
    setEmailError(null);
    if (email === null) {
      setEmailError("Please enter the email address");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    const res = await forgotPassword(email, role);
    console.log("NOOO");
    if (res === "success") {
      toastMessage("5 digit code sent to email address");
      setError(null);
      navigation.navigate("VerifyScreen", { email: email, role: role });
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
          <Text variant="body">Please enter your email address</Text>
          <Spacer position="top" size="medium" />
          <AuthInput
            label="email"
            value={email}
            mode="outlined"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(c) => setEmail(c)}
          />
          {error && (
            <Spacer position="top" size="medium">
              <Text variant="error">{error}</Text>
            </Spacer>
          )}
          {emailError && (
            <Spacer position="top" size="medium">
              <Text variant="error">{emailError}</Text>
            </Spacer>
          )}
          <Spacer position="top" size="large">
            {!isLoading ? (
              <AuthButton mode="contained" onPress={() => onSubmit()}>
                Verify
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </AccountContainer>
      </Container>
    </SafeArea>
  );
};
