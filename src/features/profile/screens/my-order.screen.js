import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { OrderCard } from "../components/order-card.component";
import { IPADDRESS } from "../../../utils/env";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const OrderContainer = styled(ScrollView)`
  margin-top: 70px;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const MyOrderScreen = ({ navigation }) => {
  const { headerToken } = useContext(AuthenticationContext);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const res = await axios({
          method: "GET",
          headers: { Authorization: `Bearer ${headerToken}` },
          url: `${IPADDRESS}/api/v1/booking/user?sort=-orderId&fields=servicePlan,orderId,orderStatus,-user`,
        });

        setOrderList(res.data.data.doc);
      } catch (e) {
        console.log(e.response.data);
      }
    };
    fetchOrderList();
  }, []);
  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title="My Order" />
      <OrderContainer>
        {orderList.map((o, i) => (
          <TouchableOpacity
            key={`CC${i}`}
            onPress={() =>
              navigation.navigate("OrderSummary", { orderId: o._id })
            }
          >
            <OrderCard orderDetails={o} />
          </TouchableOpacity>
        ))}
      </OrderContainer>
    </SafeArea>
  );
};
