import React, { useState, createContext } from "react";
import axios from "axios";
import { IPADDRESS } from "../../utils/env";
import { AuthenticationContext } from "../authentication/authentication.context";
import { toastMessage } from "../../components/toast-message/toast.component";

export const EmissionDocumentContext = createContext();

export const EmissionDocumentContextProvider = ({ children }) => {
  const { headerToken } = React.useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [emissionDocument, setEmissionDocument] = useState(null);
  const [error, setError] = useState(null);

  const createDocument = async (data) => {
    setIsLoading(true);
    console.log("D:", data);
    if (headerToken) {
      try {
        const res = await axios({
          method: "PATCH",
          headers: { Authorization: `Bearer ${headerToken}` },
          url: `${IPADDRESS}/api/v1/document/emission`,
          data: {
            emissionDocument: data,
          },
        });
        console.log("CR", res.data);
        if (res.data.status === "success") {
          setIsLoading(false);
          return "success";
          // setEmissionDocument(res.data.data.doc.emissionDocument);
        }

        setIsLoading(false);
      } catch (e) {
        console.log("E", e.response.data);
        setError(e.response.data.message);
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
        url: `${IPADDRESS}/api/v1/document/emission`,
        data: {
          emissionDocument: "",
        },
      });
      if (res.data.status === "success") {
        toastMessage("emission document deleted successfully");
        setEmissionDocument(null);
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
          url: `${IPADDRESS}/api/v1/document/emission?fields=emissionDocument`,
        });
        // if (res.data.status === "success") {
        //   console.log("success");
        // // }
        if (res.data.data.doc.emissionDocument !== undefined) {
          setEmissionDocument(res.data.data.doc.emissionDocument);
          return res.data.data.doc.emissionDocument;
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
    <EmissionDocumentContext.Provider
      value={{
        isLoading,
        isDeleteLoading,
        error,
        setError,
        createDocument,
        setEmissionDocument,
        getDocument,
        emissionDocument,
        deleteDocument,
      }}
    >
      {children}
    </EmissionDocumentContext.Provider>
  );
};
