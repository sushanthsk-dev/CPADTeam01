// import React, { useState, createContext } from "react";
// import * as firebase from "firebase";
// import { loginRequest } from "./authentication.service";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// export const AuthenticationContext = createContext();

// export const AuthenticationContextProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const saveLoggedSession = async (value) => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem("@loggedSession", jsonValue);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   firebase.auth().onAuthStateChanged((usr) => {
//     if (usr) {
//       setUser(usr);
//       saveLoggedSession(true);
//     }
//   });

//   const onLogin = (email, password) => {
//     setIsLoading(true);
//     loginRequest(email, password)
//       .then((u) => {
//         setUser(u);
//         setIsLoading(false);
//       })
//       .catch((e) => {
//         setIsLoading(false);
//         setError(e.toString());
//       });
//   };

//   // eslint-disable-next-line prettier/prettier
//   const onRegister = (email, password, repeatedPassword) => {
//     setIsLoading(true);
//     if (password !== repeatedPassword) {
//       setError("Error: Password don not match");
//       return;
//     }
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((u) => {
//         setUser(u);
//         setIsLoading(false);
//       })
//       .catch((e) => {
//         setIsLoading(false);
//         setError(e.toString());
//       });
//   };

//   const onLogout = () => {
//     setUser(null);
//     firebase.auth().signOut();
//   };
//   return (
//     <AuthenticationContext.Provider
//       value={{
//         isAuthenticated: !!user,
//         user,
//         isLoading,
//         error,
//         onLogin,
//         onRegister,
//         onLogout,
//       }}
//     >
//       {children}
//     </AuthenticationContext.Provider>
//   );
// };
