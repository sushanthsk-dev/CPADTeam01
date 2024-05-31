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
import { AgentMechanicContext } from "../../../services/agent-mechanic/agent-mechanic.context";
import { LoadingDiv } from "../../../components/loading/loading.component";
import { NoOrderContainer } from "../../../components/no-order/no-order.component";

const Tab = createMaterialTopTabNavigator();

const Container = styled.View`
  margin-top: 56px;
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

export const ManageProfile = ({ navigation, role }) => {
  const {
    getAgentMechanic,
    agentMechanic = null,
    isLoading,
  } = React.useContext(AgentMechanicContext);
  //  const [user, setUser] = useState([]);

  useEffect(() => {
    agentMechanic;
    getAgentMechanic(role);
  }, []);

  const ActiveUser = () => {
    return isLoading === true ? (
      <LoadingDiv />
    ) : (
      <>
        <CardContainer>
          {agentMechanic !== null &&
            agentMechanic.map((u) => {
              return (
                u.active === true && (
                  <TouchableOpacity
                    key={u._id}
                    onPress={() =>
                      navigation.navigate("ProfileViewScreen", {
                        role: role,
                        user: u,
                      })
                    }
                  >
                    <ProfileCard key={u._id} role={u.role} user={u} />
                  </TouchableOpacity>
                )
              );
            })}
          <NoOrderContainer text={`No ${role}`} />
        </CardContainer>
        <AddButton
          onPress={() => navigation.navigate("AddUserScreen", { role: role })}
        >
          <AntDesign name="adduser" size={24} color="white" />
        </AddButton>
      </>
    );
  };

  const DeactivedUser = () => {
    return (
      <CardContainer>
        {agentMechanic !== null &&
          agentMechanic.map((u) => {
            return (
              u.active === false && (
                <TouchableOpacity
                  key={u._id}
                  onPress={() =>
                    navigation.navigate("ProfileViewScreen", {
                      role: role,
                      user: u,
                    })
                  }
                >
                  <ProfileCard key={u._id} role={u.role} user={u} />
                </TouchableOpacity>
              )
            );
          })}
        <NoOrderContainer text={`No ${role}`} />
      </CardContainer>
    );
  };

  // const getUser = async () => {
  //   try {
  //     const res = await axios({
  //       method: "GET",
  //       url: `${IPADDRESS}/api/v1/admin?role=agent`,
  //       headers: { Authorization: `Bearer ${headerToken}` },
  //     });
  //     setUser(res.data.data.doc);
  //   } catch (e) {
  //     console.log(e.response.data.message);
  //   }
  // };

  useEffect(() => {
    // getUser();
  }, []);
  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title={`Manage ${role}`} />
      <Container>
        <Tab.Navigator>
          <Tab.Screen
            name="Active"
            options={({ route }) => ({
              headerShown: false,
              tabBarLabel: `Active ${role}`,
            })}
            component={ActiveUser}
            initialParams={{ name: "activated" }}
          />
          <Tab.Screen
            name="Deactived"
            options={({ route }) => ({
              tabBarLabel: `Deactived ${role}`,
            })}
            component={DeactivedUser}
            initialParams={{ name: "deactivated" }}
          />
        </Tab.Navigator>
      </Container>
    </SafeArea>
  );
};
