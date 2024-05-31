import React, { useContext } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Carousel } from "../../../components/carousel/carousel.component";
import { CartContext } from "../../../services/Cart/cart.context";
import { CartFloat } from "../../../components/cart/cart-float.component";
import { AddCart } from "../../../components/cart/add-cart.component";
import { Header } from "../../../components/header/header.component";
import { PriceText } from "../../../components/typography/price-text.component";

const PeriodicServiceDetailsTopContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const PeriodicServiceDetailsContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
`;

const ImageCarousel = styled.View`
  width: 100%;
  height: 200px;
  // margin-top: 50px;
  background-color: grey;
`;

const SectionRight = styled.View`
  flex: 1;
  justify-content: flex-end;
  flex-direction: row;
  justify-content: flex-end;
`;

const SpacerView = styled.View`
  margin-top: ${(props) => props.theme.space[1]};
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const ServiceSpacer = styled.View`
  margin-left: ${(props) => props.theme.space[4]};

  margin-top: ${(props) => props.theme.space[1]};
  flex-direction: row;
`;

const PeriodicServiceScrollView = styled(ScrollView)`
  margin-bottom: 50px;
`;

export const PeriodicServiceDetails = ({ route, navigation }) => {
  const { cart, addCart, removeCart } = useContext(CartContext);

  const { servicePlan } = route.params;

  return (
    <SafeArea>
      <Header title={servicePlan.title} toLeft={true} navigation={navigation} />
      <PeriodicServiceScrollView>
        <ImageCarousel>
          <Carousel images={servicePlan.images} />
        </ImageCarousel>
        <PeriodicServiceDetailsTopContainer>
          <Spacer position="none">
            <Text variant="title">{servicePlan.title }</Text>
          </Spacer>
          <SectionRight>
            <PriceText price={servicePlan.price} />
          </SectionRight>
          <Spacer size="larger">
            <AddCart servicePlan={servicePlan} textComponent />
          </Spacer>
        </PeriodicServiceDetailsTopContainer>

        <PeriodicServiceDetailsContainer>
          <SpacerView>
            <FontAwesome name="square" size={16} color="black" />
            <Spacer position="bottom" size="small">
              <Text variant="body">{` ${servicePlan.features[0]}`}</Text>
            </Spacer>
          </SpacerView>
          <SpacerView>
            <FontAwesome name="square" size={16} color="black" />
            <Spacer position="bottom" size="small">
              <Text variant="body">{` ${servicePlan.features[1]}`}</Text>
            </Spacer>
          </SpacerView>
          <SpacerView>
            <FontAwesome name="square" size={16} color="black" />
            <Text variant="body">{` ${servicePlan.features[2]}`}</Text>
          </SpacerView>
          {servicePlan.services.map((s, i) => (
            <ServiceSpacer key={i}>
              <Entypo name="dot-single" size={24} color="black" />
              <Text variant="body">{s}</Text>
            </ServiceSpacer>
          ))}
        </PeriodicServiceDetailsContainer>
      </PeriodicServiceScrollView>
      {!!cart.id && <CartFloat navigation={navigation} />}
    </SafeArea>
  );
};
