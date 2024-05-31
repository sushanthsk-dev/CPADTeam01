import React, { createContext, useEffect, useState } from "react";
import { locationRequest } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    locationRequest()
      .then(({ results = [] }) => {
        setError(null);
        setIsLoading(true);
        setLocation(results);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);
  return (
    <LocationContext.Provider value={{ isLoading, error, mechanics: location }}>
      {children}
    </LocationContext.Provider>
  );
};
