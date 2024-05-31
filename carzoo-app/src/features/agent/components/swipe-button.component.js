import React from "react";
import SwipeButton from "rn-swipe-button";
import styled from "styled-components/native";
import { BookingOrderContext } from "../../../services/order-list/booking-order.context";

const SwipeBtnSection = styled.View`
  margin-bottom: ${(props) => props.theme.space[2]};
`;
export const Swipe = ({ orderStatus, orderId }) => {
  const serviceStatus = ["Ordered", "Pickedup", "Serviced", "Deliveried"];
  const currentStatusIndex = serviceStatus.indexOf(orderStatus) + 1;

  const [title, setTitle] = React.useState(serviceStatus[currentStatusIndex]);
  const { updateServiceOrderStatus } = React.useContext(BookingOrderContext);
  React.useEffect(() => {}, []);
  return (
    <SwipeBtnSection>
      <SwipeButton
        disabled={
          serviceStatus[currentStatusIndex - 1] === "Deliveried" ? true : false
        }
        //disable the button by doing true (Optional)
        swipeSuccessThreshold={70}
        height={45}
        //height of the button (Optional)

        //width of the button (Optional)
        title={
          serviceStatus[currentStatusIndex - 1] === "Deliveried"
            ? "Service Completed"
            : title
        }
        //Text inside the button (Optional)
        //thumbIconImageSource={thumbIcon}
        //You can also set your own icon (Optional)
        onSwipeSuccess={() => {
          updateServiceOrderStatus(orderId, serviceStatus[currentStatusIndex]);
        }}
        shouldResetAfterSuccess={true}
        //After the completion of swipe (Optional)
        railFillBackgroundColor="#6200EE" //(Optional)
        railFillBorderColor="#e688ff" //(Optional)
        thumbIconBackgroundColor="#6200EE" //(Optional)
        thumbIconBorderColor="#ed9aff" //(Optional)
        railBackgroundColor="#F1F1F1" //(Optional)
        railBorderColor="#bbeaff" //(Optional)
      />
    </SwipeBtnSection>
  );
};
