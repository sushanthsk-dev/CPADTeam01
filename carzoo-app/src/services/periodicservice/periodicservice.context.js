import React, { useState, useEffect, createContext } from "react";
import {
  periodicServiceRequest,
  periodicServiceTransform,
} from "./periodicservice.service";

export const PeriodicServiceContext = createContext();

export const PeriodicServiceContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [periodicService, setPeriodicService] = useState([]);
  const [error, setError] = useState(null);

  const retrievePeriodicService = () => {
    setIsLoading(true);
    setPeriodicService([]);
    setTimeout(() => {
      periodicServiceRequest()
        .then(periodicServiceTransform)
        .then((periodicServiceResponse) => {
          setPeriodicService(periodicServiceResponse);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    }, 2000);
  };

  useEffect(() => {
    retrievePeriodicService();
  }, []);
  return (
    <PeriodicServiceContext.Provider
      value={{ periodicServicePlans: periodicService }}
    >
      {children}
    </PeriodicServiceContext.Provider>
  );
};
