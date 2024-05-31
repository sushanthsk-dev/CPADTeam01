import React from "react";
import NetInfo from "@react-native-community/netinfo";

export const NetworkContext = React.createContext();

export const NetworkContextProvider = ({ children }) => {
  const [isConnected, setIsConnected] = React.useState(true);

  const checkInternetConnection = () =>
    NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setIsConnected(offline);
    });

  React.useEffect(() => {
    checkInternetConnection();
    () => checkInternetConnection();
  }, []);

  return (
    <NetworkContext.Provider
      value={{ isConnected: isConnected, checkInternetConnection }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
