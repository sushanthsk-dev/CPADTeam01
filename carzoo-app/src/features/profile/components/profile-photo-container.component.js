import React from "react";
import styled from "styled-components/native";

const PhotoContainer = styled.View`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  margin: ${(props) => props.theme.space[3]};
`;

const ProfilePhoto = styled.Image`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 56px;
`;

export const ProfilePhotoContainer = ({ size = "100px" }) => {
  return (
    <PhotoContainer size={size}>
      <ProfilePhoto
        size={size}
        source={require("../../../../assets/default.jpg")}
      />
    </PhotoContainer>
  );
};
