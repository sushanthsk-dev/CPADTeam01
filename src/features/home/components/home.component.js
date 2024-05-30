import React from "react";
import { Card } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const FeatureCardContainer = styled(Card)`
  width: 156px;
  margin: ${(props) => props.theme.space[2]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeatureCardCover = styled(Card.Cover)`
  height: 120px;
  width: 156px;
`;
export const FeatureCard = ({
  title,
  imgSrc = "https://picsum.photos/700",
}) => {
  return (
    <FeatureCardContainer elevation={5}>
      <FeatureCardCover source={{ uri: imgSrc }} />
      <Spacer position="top" size="medium">
        <Spacer position="top" size="medium">
          <Spacer position="bottom" size="large">
            <Text variant="subTitle">{title}</Text>
          </Spacer>
        </Spacer>
      </Spacer>
    </FeatureCardContainer>
  );
};
