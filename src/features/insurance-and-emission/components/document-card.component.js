import React from "react";
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";

const DocumentCardContainer = styled.View`
  margin: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[1]};
`;
const Card = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding: ${(props) => props.theme.space[3]};
  margin: ${(props) => props.theme.space[2]};
  border-radius: 4px;
`;

const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Body = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[1]};
`;

export const InsuranceDocumentCard = ({ navigation }) => {
  return (
    <DocumentCardContainer>
      <Card>
        <Title>
          <Text>Oriental Insurance</Text>
          <EvilIcons
            name="pencil"
            size={28}
            color="green"
            onPress={() => navigation.navigate("AddDocumentScreen")}
          />
        </Title>
        <Spacer size="large">
          <Text variant="light_text">Policy No</Text>
          <Text variant="subHead">4222203/31/2021/3873</Text>
        </Spacer>
        <Body>
          <View>
            <Text variant="light_text">Insured's Name</Text>
            <Text variant="subHead">Virat Kohli</Text>
          </View>
          <Spacer position="right" size="larger">
            <Text variant="light_text">Expiry date</Text>
            <Text variant="subHead">12/10/2021</Text>
          </Spacer>
        </Body>
      </Card>
      <Spacer position="left" size="medium">
        <Text variant="error">
          Your insurance document will expire in 296days
        </Text>
      </Spacer>
    </DocumentCardContainer>
  );
};

export const EmissionDocumentCard = ({ navigation }) => {
  return (
    <DocumentCardContainer>
      <Card>
        <Title>
          <Text>Emission Test </Text>
          <EvilIcons
            name="pencil"
            size={28}
            color="green"
            onPress={() => navigation.navigate("AddDocumentScreen")}
          />
        </Title>
        <Spacer size="large">
          <Text variant="light_text">Pucc No</Text>
          <Text variant="subHead">P1486KA102587</Text>
        </Spacer>
        <Body>
          <View>
            <Text variant="light_text">Customer's Name</Text>
            <Text variant="subHead">Virat Kohli</Text>
          </View>
          <Spacer position="right" size="larger">
            <Text variant="light_text">Expiry date</Text>
            <Text variant="subHead">25/02/2021</Text>
          </Spacer>
        </Body>
      </Card>
      <Spacer position="left" size="medium">
        <Text variant="error">
          Your emission document will expire in 296days
        </Text>
      </Spacer>
    </DocumentCardContainer>
  );
};
