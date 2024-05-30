import React from "react";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";

const Container = styled.View`
  position: relative;

  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TextTitle = styled(Text)`
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const NoOrderContainer = ({ text = "No service order assgined" }) => {
  console.log("running");
  return (
    <Container>
      <TextTitle variant="title">{text}</TextTitle>
    </Container>
  );
};
