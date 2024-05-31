import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

const ServiceStatusContainer = styled.View`
  margin: ${(props) => props.theme.space[2]} 0;
`;

const StatusCard = styled.View`
  margin: ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StraightLine = styled.View`
  width: 64px;
  height: 5px;
  border-radius: 2px;
  background-color: ${({ marked, theme }) =>
    marked === false ? theme.colors.ui.secondary : theme.colors.brand.primary};
  margin: ${(props) => props.theme.space[1]};
`;

const StatusView = styled.View`
  align-items: center;
  flex-direction: row;
`;
const SpacerView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ServiceStatus = ({ orderStatus = "Ordered" }) => {
  const status = ["Ordered", "Pickedup", "Serviced", "Deliveried"];
  const currentStatus = status.indexOf(orderStatus);
  return (
    <ServiceStatusContainer>
      <StatusCard>
        {status.map((s, i) => (
          <StatusView key={i + 10}>
            <FontAwesome
              key={i}
              name="circle"
              size={32}
              color={`${i <= currentStatus ? "#6200EE" : "#757575"}`}
            />
            {i < status.length - 1 && (
              <StraightLine
                key={i + 1}
                marked={i < currentStatus ? true : false}
              />
            )}
          </StatusView>
        ))}
      </StatusCard>
      <SpacerView>
        <Text variant="caption">Ordered</Text>
        <Spacer position="left" size="medium">
          <Text variant="caption">Pickedup</Text>
        </Spacer>
        <Spacer position="left" size="medium">
          <Text variant="caption">Serviced</Text>
        </Spacer>
        <Text variant="caption">Deliveried</Text>
      </SpacerView>
    </ServiceStatusContainer>
  );
};
