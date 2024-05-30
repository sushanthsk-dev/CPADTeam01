import React, { useState } from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AddCart } from "../../../components/cart/add-cart.component";
import { PriceText } from "../../../components/typography/price-text.component";
const PlanCard = styled.View`
  flex-direction: row;
  padding: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[4]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
const PlanCardCover = styled(Card.Cover)`
  height: 40px;
  width: 40px;
  margin: ${(props) => props.theme.space[2]};
`;
const Info = styled.View`
  flex: 1;
  margin: ${(props) => props.theme.space[2]};
`;

const TopSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const TopSectionEnd = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
`;
const BottomSection = styled.View`
  flex: 1;
  padding: 0 ${(props) => props.theme.space[2]};
`;

const Section = styled.View`
  flex-direction: row;
  margin: ${(props) => props.theme.space[1]} 0;
`;

export const PeriodicServiceInfo = ({ periodicService = {} }) => {
  const {
    title = "Basic Service",
    imageCover = "../../../../assets/icon.png",
    price = 2099,
    features = [
      "4 hours takes",
      "Recommended for every 4000 KM / 3 Months",
      "Includes 6 services",
    ],
  } = periodicService;

  return (
    <PlanCard style={styles.Card}>
      <Info>
        <AddCart servicePlan={periodicService} />
        <TopSection>
          <Spacer>
            <Text variant="subTitle">{title}</Text>
          </Spacer>

          <TopSectionEnd>
            <PriceText price={price} />
          </TopSectionEnd>
        </TopSection>
        <BottomSection>
          <Section>
            <Ionicons name="time-outline" size={18} color="black" />
            <Spacer position="left">
              <Text variant="caption">{features[0]}</Text>
            </Spacer>
          </Section>
          <Section>
            <Spacer position="left" size="s_small">
              <FontAwesome name="thumbs-o-up" size={18} color="black" />
            </Spacer>
            <Spacer position="left" size="m_medium">
              <Text variant="caption">{features[1]}</Text>
            </Spacer>
          </Section>
          <Section>
            <Spacer position="left" size="s_small">
              <MaterialIcons
                name="miscellaneous-services"
                size={18}
                color="black"
              />
            </Spacer>
            <Spacer position="left" size="s_small">
              <Text variant="caption">{features[2]}</Text>
            </Spacer>
          </Section>
        </BottomSection>
      </Info>
    </PlanCard>
  );
};

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
