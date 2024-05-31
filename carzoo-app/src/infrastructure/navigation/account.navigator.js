import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { VerifyScreen } from "../../features/account/screens/verify.screen";
import { ChangePasswordScreen } from "../../features/account/screens/changepassword.screen";
import { AdminLoginScreen } from "../../features/account/screens/admin-login.screen";
import { ForgotPasswordScreen } from "../../features/account/screens/forogt-password.screen";
import { ResetPasswordScren } from "../../features/account/screens/reset-password.screen";
const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />

      <Stack.Screen name="AdminLoginScreen" component={AdminLoginScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name="ResetPasswordScren" component={ResetPasswordScren} />
    </Stack.Navigator>
  );
};
