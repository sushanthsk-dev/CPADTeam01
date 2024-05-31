import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IPADDRESS } from "../../utils/env";
import { toastMessage } from "../../components/toast-message/toast.component";
export const BookingOrderContext = createContext();

export const BookingOrderContextProvider = ({ children }) => {
  const { headerToken, user } = useContext(AuthenticationContext);
  const [orderList, setOrderList] = useState(null);
  const [serviceOrder, setServiceOrder] = useState(null);
  const [update, setUpdate] = useState(false);
  const [agentAssignedOrderList, setAgentAssignedOrderList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBookingOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${IPADDRESS}/api/v1/booking?sort=-p`,
        headers: { Authorization: `Bearer ${headerToken}` },
      });
      setOrderList(res.data.data.doc);
      setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };
  const getServiceOrder = async (serviceOrderId) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${IPADDRESS}/api/v1/booking/${serviceOrderId}`,
        headers: { Authorization: `Bearer ${headerToken}` },
      });
      setServiceOrder(res.data.data.doc);
      setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };
  const assignAgent = async (orderId, agentId) => {
    console.log(orderId, agentId);
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PATCH",
        url: `${IPADDRESS}/api/v1/booking/${orderId}`,
        headers: { Authorization: `Bearer ${headerToken}` },
        data: {
          agent: agentId,
        },
      });
      if (res.data.status === "success") {
        toastMessage("Agent assigned successfully");
        await getBookingOrders();
        setIsLoading(false);
        return "success";
      }
      setIsLoading(false);
      // setAgentMechanic(res.data.data.doc);
    } catch (e) {
      console.log("E", e.response.data);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  const filteredServiceOrderedList = (orderId, orderStatus) => {
    setOrderList(
      setAgentAssignedOrderList.map((o) =>
        o._id === orderId ? { ...o, orderStatus: orderStatus } : o
      )
    );
  };

  const updateServiceOrderStatus = async (orderId, orderStatus) => {
    setIsLoading(true);
    setUpdate(false);
    console.log(orderId, orderStatus);
    try {
      const res = await axios({
        method: "PATCH",
        url: `${IPADDRESS}/api/v1/booking/${orderId}`,
        headers: { Authorization: `Bearer ${headerToken}` },
        data: {
          orderStatus: orderStatus,
        },
      });
      if (orderStatus === "Deliveried") {
        console.log(orderStatus);
        getAgentAssignedOrders();
      }
      console.log(res.data.status);
      if (res.data.status === "success") {
        setUpdate(true);
        setServiceOrder(res.data.data.data);
        filteredServiceOrderedList(orderId, orderStatus);
        toastMessage(`Car ${orderStatus} successfully`);

        console.log(orderStatus);

        setIsLoading(false);
        return "success";
      }
      setIsLoading(false);
      // setAgentMechanic(res.data.data.doc);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  const getAgentAssignedOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: `${IPADDRESS}/api/v1/booking?agent=${user._id}&sort=-createdAt`,
        headers: { Authorization: `Bearer ${headerToken}` },
      });
      setAgentAssignedOrderList(res.data.data.doc);
      setIsLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <BookingOrderContext.Provider
      value={{
        getBookingOrders,
        getServiceOrder,
        getAgentAssignedOrders,
        serviceOrder,
        orderList,
        setServiceOrder,
        agentAssignedOrderList,
        updateServiceOrderStatus,
        assignAgent,
        isLoading,
        error,
      }}
    >
      {children}
    </BookingOrderContext.Provider>
  );
};
