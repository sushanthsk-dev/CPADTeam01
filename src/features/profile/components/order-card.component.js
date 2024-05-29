import React from "react";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const Section = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[1]};
`;
const OrderCardContainer = styled.View`
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border-radius: 5px;
`;
export const OrderCard = ({ orderDetails }) => {
  return (
    <OrderCardContainer>
      <Section>
        <Text variant="title">Basic Service</Text>
        <Text variant="caption">ID : CA15964</Text>
      </Section>
      <Spacer position="left" size="medium">
        <Text variant="light_text">Onprocessing</Text>
      </Spacer>
    </OrderCardContainer>
  );
};
