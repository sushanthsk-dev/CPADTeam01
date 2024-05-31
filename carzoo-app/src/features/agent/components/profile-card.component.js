import React from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Entypo } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ProfilePhotoContainer } from "../../profile/components/profile-photo-container.component";
const AgentCardContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: ${(props) => props.theme.space[0]};
  margin: 1px ${(props) => props.theme.space[1]};
  border-bottom-width: 0.5px;
  border-color: grey;
`;

const SpacerView = styled.View`
  align-items: flex-start;
`;
const AgentDetails = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-right: ${(props) => props.theme.space[3]};
  justify-content: space-between;
`;
export const ProfileCard = ({ name }) => {
  return (
    <AgentCardContainer>
      <ProfilePhotoContainer size="60px" />
      <AgentDetails>
        <SpacerView>
          <Text variant="subTitle">Rohith Sharma</Text>
          <Spacer>
            <Text variant="caption">Moodbidri</Text>
          </Spacer>
        </SpacerView>
        <Text>{name}</Text>
      </AgentDetails>
    </AgentCardContainer>
  );
};
