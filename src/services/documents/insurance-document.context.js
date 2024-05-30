import React, { useState, createContext } from "react";
import axios from "axios";
import { IPADDRESS } from "../../utils/env";
import { AuthenticationContext } from "../authentication/authentication.context";

export const InsuranceDocumentContext = createContext();

export const InsuranceDocumentContextProvider = ({ children }) => {
  const { headerToken } = React.useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [insuranceDocument, setInsuranceDocument] = useState(null);
  const [error, setError] = useState(null);

  const createDocument = async (data) => {
    setIsLoading(true);
    console.log("D:", data);
    if (headerToken) {
      try {
        const res = await axios({
          method: "PATCH",
          headers: { Authorization: `Bearer ${headerToken}` },
          url: `${IPADDRESS}/api/v1/document/insurance`,
          data: {
            insuranceDocument: data,
          },
        });
        console.log("CR", res.data);
        if (res.data.status === "success") {
          setIsLoading(false);
          return "success";
          // setInsuranceDocument(res.data.data.doc.insuranceDocument);
        }

        setIsLoading(false);
      } catch (e) {
        console.log("E", e);
        setIsLoading(false);
      }
    }
    return null;
  };

  const updateDocumentDetails = async (data) => {};

  const deleteDocument = async (navigation) => {
    setIsDeleteLoading(true);
    try {
      const res = await axios({
        method: "DELETE",
        headers: { Authorization: `Bearer ${headerToken}` },
        url: `${IPADDRESS}/api/v1/document/insurance`,
        data: {
          insuranceDocument: "",
        },
      });
      if (res.data.status === "success") {
        setInsuranceDocument(null);
        setIsDeleteLoading(false);
        navigation.goBack();
      }
    } catch (e) {
      console.log(e.response.data);
      setIsDeleteLoading(false);
    }
  };

  const getDocument = async () => {
    if (headerToken) {
      try {
        const res = await axios({
          method: "GET",
          headers: { Authorization: `Bearer ${headerToken}` },
          url: `${IPADDRESS}/api/v1/document/insurance?fields=insuranceDocument`,
        });
        // if (res.data.status === "success") {
        //   console.log("success");
        // // }
        console.log("DOC", res.data.data.doc.emissionDocument);
        if (res.data.data.doc.insuranceDocument !== undefined) {
          setInsuranceDocument(res.data.data.doc.insuranceDocument);
          return res.data.data.doc.insuranceDocument;
        }
      } catch (e) {
        console.log("ERR", e.response.data);
      }
    }
  };

  React.useEffect(() => {
    getDocument();
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <InsuranceDocumentContext.Provider
      value={{
        isLoading,
        isDeleteLoading,
        error,
        createDocument,
        setInsuranceDocument,
        getDocument,
        insuranceDocument,
        deleteDocument,
      }}
    >
      {children}
    </InsuranceDocumentContext.Provider>
  );
};
