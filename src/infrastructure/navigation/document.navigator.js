import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { DocumentScreen } from "../../features/insurance-and-emission/screens/documents.screens";
import { AddDocumentScreen } from "../../features/insurance-and-emission/screens/add-document.screen";

const DocumentStack = createStackNavigator();
export const DocumentNavigator = () => {
  return (
    <DocumentStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
    >
      <DocumentStack.Screen name="DocumentScreen" component={DocumentScreen} />
      <DocumentStack.Screen
        name="AddDocumentScreen"
        component={AddDocumentScreen}
      />
    </DocumentStack.Navigator>
  );
};
