import React from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { ProfilePhotoContainer } from "./profile-photo-container.component";
import { Entypo } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
const AgentCardContainer = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[1]};
`;
const LocationContainer = styled.View`
  flex-direction: row;
`;

const SpacerView = styled.View`
  align-items: flex-start;
`;
const AgentDetails = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
export const AgentCard = () => {
  return (
    <AgentCardContainer>
      <ProfilePhotoContainer size="60px" />
      <AgentDetails>
        <SpacerView>
          <Text variant="subTitle">Rohith Sharma</Text>
          <Spacer>
            <Text variant="subHead">987653100</Text>
          </Spacer>
        </SpacerView>

        <LocationContainer>
          <Entypo name="location-pin" size={18} color="black" />
          <Text>Moodbidri</Text>
        </LocationContainer>
      </AgentDetails>
    </AgentCardContainer>
  );
};
