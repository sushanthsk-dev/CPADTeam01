import React, { useEffect, useState } from "react";
import { IPADDRESS } from "../../../utils/env";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import axios from "axios";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfileCard } from "../components/profile-card.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Tab = createMaterialTopTabNavigator();

const OrderContainer = styled.View`
  margin-top: 70px;
  flex: 1;
`;

const CardContainer = styled(ScrollView)`
  background-color: #fff;
`;

const AddButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 999;
  border-radius: 25px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  padding: ${(props) => props.theme.space[2]};
  bottom: 20px;
  right: 24px;
`;

export const ManageProfile = ({ navigation, name }) => {
  const { headerToken } = React.useContext(AuthenticationContext);
  const [user, setUser] = useState([]);

  const ActiveUser = () => {
    return (
      <>
        <CardContainer>
          {user ? (
            user.map((u) => {
              return (
                u.active === true && (
                  <TouchableOpacity
                    key={u._id}
                    onPress={() =>
                      navigation.navigate("ProfileViewScreen", {
                        name: name,
                        user: u,
                      })
                    }
                  >
                    <ProfileCard key={u._id} name={u.role} user={u} />
                  </TouchableOpacity>
                )
              );
            })
          ) : (
            <ProfileCard name={name} />
          )}
        </CardContainer>
        <AddButton
          onPress={() => navigation.navigate("AddUserScreen", { name: name })}
        >
          <AntDesign name="adduser" size={24} color="white" />
        </AddButton>
      </>
    );
  };

  const DeactivedUser = () => {
    return (
      <CardContainer>
        {user ? (
          user.map((u) => {
            return (
              u.active === false && (
                <TouchableOpacity
                  key={u._id}
                  onPress={() =>
                    navigation.navigate("ProfileViewScreen", {
                      name: name,
                      user: u,
                    })
                  }
                >
                  <ProfileCard key={u._id} name={u.role} user={u} />
                </TouchableOpacity>
              )
            );
          })
        ) : (
          <ProfileCard name={name} />
        )}
      </CardContainer>
    );
  };

  const getUser = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${IPADDRESS}/api/v1/admin?role=agent`,
        headers: { Authorization: `Bearer ${headerToken}` },
      });
      setUser(res.data.data.doc);
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  useEffect(() => {
    getUser();
    user.map((u) => {
      console.log("Map", u.name);
    });
  }, []);
  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title={`Manage ${name}`} />
      <OrderContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Active"
            options={({ route }) => ({
              tabBarLabel: `Active ${name}`,
            })}
            component={ActiveUser}
            initialParams={{ name: "activated" }}
          />
          <Tab.Screen
            name="Deactived"
            options={({ route }) => ({
              tabBarLabel: `Deactived ${name}`,
            })}
            component={DeactivedUser}
            initialParams={{ name: "deactivated" }}
          />
        </Tab.Navigator>
      </OrderContainer>
    </SafeArea>
  );
};
