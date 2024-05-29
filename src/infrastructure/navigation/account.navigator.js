import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { VerifyScreen } from "../../features/account/screens/verify.screen";
import { ChangePasswordScreen } from "../../features/account/screens/changepassword.screen";
import { AdminLoginScreen } from "../../features/account/screens/admin-login.screen";
const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  );
};
