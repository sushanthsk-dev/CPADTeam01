import React from "react";
import { StyleSheet, Modal, View, BackHandler } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { Header } from "../../components/header/header.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
import { SafeArea } from "../../components/utility/safe-area.component";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ImageContainer = styled.Image`
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
  resize-mode: contain;
`;

export const GPSMapErrorScreen = ({ errorMsg, grantGPS, navigation }) => {
  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };
  React.useEffect(() => {
    //  grantGPS();
   // grantGPS();
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  return (
    <>
      <Header toLeft={true} navigation={navigation}  />
      <View style={styles.modal} animationInTiming={600}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {errorMsg ? "GPS Location Required" : "GPS Location Required"}
          </Text>
          <Text style={styles.modalText}>
            {errorMsg
              ? "Oops! Looks like your GPS location is not connected."
              : "Oops! Looks like your GPS location is not connected."}
          </Text>
          <Text style={styles.modalText}>
            Please go to app setting and allow the app to use location service
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // ...
  modal: {
    justifyContent: "flex-end",
    backgroundColor: "white",
    margin: 0,
    zIndex: 999,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
