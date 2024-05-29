import React from "react";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const FeatureCardContainer = styled(Card)`
  width: 150px;
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeatureCardCover = styled(Card.Cover)`
  height: 90px;
  width: 90px;
  margin: auto;
`;
export const FeatureCard = ({ title }) => {
  return (
    <FeatureCardContainer elevation={5}>
      <Spacer position="top" size="large">
        <FeatureCardCover source={require("../../../../assets/icon.png")} />
      </Spacer>
      <Spacer position="top" size="large">
        <Spacer position="top" size="medium">
          <Spacer position="bottom" size="medium">
            <Text variant="subTitle">{title}</Text>
          </Spacer>
        </Spacer>
      </Spacer>
    </FeatureCardContainer>
  );
};
