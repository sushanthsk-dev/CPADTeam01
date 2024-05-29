import React, { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";

const MechanicContainer = styled.View`
  position: absolute;
  bottom: 0;
  height: 60%;
`;
export const MechanicScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const { mechanic } = route.params;
  return null;
};
