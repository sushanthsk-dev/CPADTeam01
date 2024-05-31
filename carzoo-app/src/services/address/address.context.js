import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthenticationContext } from "../authentication/authentication.context";
import { IPADDRESS } from "../../utils/env";

export const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const { headerToken, user } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(null);

  const saveAddress = (addrss) => {
    setAddress(address);
  };
  const loadAddress = async () => {
    if (headerToken) {
      try {
        const url =
          user.role === "user"
            ? `${IPADDRESS}/api/v1/users/me`
            : `${IPADDRESS}/api/v1/admin/me`;
        const res = await axios({
          method: "GET",
          headers: { Authorization: `Bearer ${headerToken}` },
          url: url,
        });
        if (res.data.data.doc.address !== undefined) {
          setAddress({
            ...res.data.data.doc.address,
            phoneno: res.data.data.doc.phoneno,
          });
        }
      } catch (e) {
        console.log("JWT", e.response.data.message);
        setError(e.response.data.message);
      }
    }
  };

  const add = async (addrss) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PATCH",
        headers: { Authorization: `Bearer ${headerToken}` },
        url: `${IPADDRESS}/api/v1/users/updateMe`,
        data: {
          phoneno: addrss.phoneno,
          address: addrss,
        },
      });
      if (res.data.status === "success") {
        setAddress({
          ...res.data.data.updatedUser.address,
          phoneno: res.data.data.updatedUser.phoneno,
        });

        setIsLoading(false);
        return res.data.status;
      }
      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  const remove = () => {};

  useEffect(() => {
    setIsLoading(true);
    loadAddress();
    console.log(address);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setAddress(address);
  }, [address]);

  return (
    <AddressContext.Provider
      value={{
        address,
        addAddress: add,
        error,
        setAddress,
        setError,
        removeAddress: remove,
        isLoading: isLoading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
