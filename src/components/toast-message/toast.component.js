import { ToastAndroid } from "react-native";

export const toastMessage = (message) => {
  ToastAndroid.showWithGravity(
    `${message}`,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
