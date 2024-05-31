// import { ToastAndroid, ToastIos } from "react-native";
import { ToasterHelper } from "react-native-customizable-toast";

export const toastMessage = (message) => {
  ToasterHelper.show({
    text: message,
    type: 'success',
    timeout: 5000,
  });
  // ToastAndroid.showWithGravity(
  //   `${message}`,
  //   ToastAndroid.LONG,
  //   ToastAndroid.BOTTOM,
  //   25,
  //   50
  // );
};
