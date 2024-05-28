import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback } from "react-native";
import { DateView } from "../../../components/date-time/date.component";
import { Header } from "../../../components/header/header.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { DateTimeContext } from "../../../services/date-time/dateTime.context";

const CheckoutContainer = styled.View``;
const DateTimeContainer = styled.View``;
const DateContainer = styled.View``;
const DateSelectView = styled.View`
  flex-direction: row;
`;
const TimeContainer = styled.View``;
export const CheckoutScreen = () => {
  //   const [selectedDate, setSelectedDate] = useState([]);

  const dates = [
    {
      id: 123,
      dateDay: 7,
      weekDay: "Mon",
    },
    {
      id: 124,
      dateDay: 8,
      weekDay: "Tue",
    },
    {
      id: 125,
      dateDay: 9,
      weekDay: "Wed",
    },
    {
      id: 126,
      dateDay: 10,
      weekDay: "Thur",
    },
    {
      id: 127,
      dateDay: 11,
      weekDay: "Fri",
    },
  ];

  return (
    <SafeArea>
      <Header title="Checkout" toLeft={true} />
      <CheckoutContainer>
        <DateTimeContainer>
          <DateContainer>
            <Text variant="checkoutTitle">Select pickup date </Text>
            <DateSelectView>
              {dates.map((d) => (
                <DateView key={d.id} dateData={d} />
              ))}
            </DateSelectView>
          </DateContainer>
          <TimeContainer>
            <Text variant="checkoutTitle">Select pickup date and time</Text>
          </TimeContainer>
        </DateTimeContainer>
      </CheckoutContainer>
    </SafeArea>
  );
};
