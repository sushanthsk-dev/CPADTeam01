import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, ScrollView, View, Image } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { OrderCard } from "../components/order-card.component";
import { IPADDRESS } from "../../../utils/env";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Text } from "../../../components/typography/text.component";
import { LoadingDiv } from "../../../components/loading/loading.component";

const OrderContainer = styled(ScrollView)`
  padding-top: 10px;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const Container = styled(View)`
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ImageContainer = styled(Image)`
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const MyOrderScreen = ({ navigation }) => {
  const { headerToken } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "GET",
          headers: { Authorization: `Bearer ${headerToken}` },
          url: `${IPADDRESS}/api/v1/booking/user?sort=-createdAt&fields=servicePlan,orderId,orderStatus,-user,createdAt,deliveriedDate`,
        });

        setOrderList(res.data.data.doc);
        console.log(res.data.data.doc);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response.data);
        setIsLoading(false);
      }
    };
    fetchOrderList();
  }, []);
  return !isLoading ? (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title="My Order" />
      {orderList.length > 0 ? (
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
      ) : (
        <Container>
          <ImageContainer source={require("../../../../assets/no-order.png")} />
          <Text variant="title">No Service Order</Text>
        </Container>
      )}
    </SafeArea>
  ) : (
    <LoadingDiv />
  );
};
